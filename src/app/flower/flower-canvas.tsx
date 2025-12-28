"use client";

import type p5 from "p5";
import { useCallback, useRef } from "react";
import { P5Canvas } from "@/components/p5";
import type { FlowerParams } from "./schema";
import { defaultFlowerParams } from "./schema";

const STROKE_WEIGHT = 0;
const BACKGROUND_HUE = 0;
const BACKGROUND_SATURATION = 0;
const BACKGROUND_BRIGHTNESS = 0;

type FlowerCanvasProps = {
  paramsRef: React.MutableRefObject<FlowerParams>;
  className?: string;
};

export function FlowerCanvas({ paramsRef, className }: FlowerCanvasProps) {
  const vRef = useRef<p5.Vector[][]>([]);
  const cachedParamsRef = useRef<string>("");
  const isInteractingRef = useRef(false);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const setup = useCallback((p: p5, height: number, width: number) => {
    p.createCanvas(width, height, p.WEBGL);
    p.angleMode(p.DEGREES);
    p.colorMode(p.HSB, 360, 100, 100);
    p.noStroke();
    if (STROKE_WEIGHT > 0) {
      p.stroke(0);
      p.strokeWeight(STROKE_WEIGHT);
    }
    // Enable smooth rendering for better GPU performance
    p.smooth();
  }, []);

  const draw = useCallback(
    (p: p5) => {
      const params = paramsRef.current;

      // Detect if user is interacting with orbit controls
      if (p.mouseIsPressed || p.touches.length > 0) {
        if (!isInteractingRef.current) {
          isInteractingRef.current = true;
        }
        // Reset timeout
        clearTimeout(interactionTimeoutRef.current);
        interactionTimeoutRef.current = setTimeout(() => {
          isInteractingRef.current = false;
        }, 100);
      }

      // Use lower quality during interaction for better performance
      const qualityMultiplier = isInteractingRef.current ? 0.5 : 1;
      const effectiveRows = Math.ceil(params.rows * qualityMultiplier);
      const effectiveCols = Math.ceil(params.cols * qualityMultiplier);

      // Create cache key to check if mesh needs recalculation
      const cacheKey = `${effectiveRows}-${effectiveCols}-${params.thetaStep}-${params.phiStep}-${params.petalCount}-${params.flowerDiameter}-${params.petalLength}-${params.petalSharpness}-${params.flowerHeight}-${params.curvatureExponential}-${params.curvaturePolynomial}-${params.curvaturePower}-${params.verticalShift}-${params.bumpAmplitude}-${params.bumpFrequency}`;

      // Only recalculate mesh if parameters changed
      if (cachedParamsRef.current !== cacheKey) {
        vRef.current = [];
        cachedParamsRef.current = cacheKey;

        // Generate theta values for rows
        const thetaValues = Array.from(
          { length: Math.ceil(effectiveRows / params.thetaStep) },
          (_, i) => i * params.thetaStep
        );

        // Build vertex mesh
        for (const theta of thetaValues) {
          vRef.current.push([]);

          // Generate phi values for columns
          const phiValues = Array.from(
            { length: Math.ceil(effectiveCols / params.phiStep) },
            (_, i) => i * params.phiStep
          );

          for (const phi of phiValues) {
            // Calculate radial distance with petal shape
            const petalShape = p.pow(
              p.abs(
                p.sin(((params.petalCount / 2) * phi * 360) / effectiveCols)
              ),
              params.petalSharpness
            );
            const r =
              ((params.petalLength * petalShape + params.flowerDiameter) *
                theta) /
              effectiveRows;

            // Convert to Cartesian coordinates
            const x = r * p.cos((phi * 360) / effectiveCols);
            const y = r * p.sin((phi * 360) / effectiveCols);

            // Calculate normalized radius for z-coordinate functions
            const normalizedR = p.abs(r / 100);

            // Calculate vertical position with curvature
            const verticalShape =
              params.flowerHeight *
              p.pow(
                Math.E,
                -params.curvatureExponential *
                  p.pow(p.abs(normalizedR), params.curvaturePower)
              ) *
              p.pow(p.abs(normalizedR), params.curvaturePolynomial);

            // Add surface bumpiness
            const bumpiness =
              1 +
              params.bumpAmplitude *
                p.pow(normalizedR, 2) *
                p.sin((params.bumpFrequency * (phi * 360)) / effectiveCols);

            const z = verticalShape - params.verticalShift + bumpiness;

            const vPoint = p.createVector(x, y, z);
            vRef.current[theta]?.push(vPoint);
          }
        }
      }

      p.background(
        BACKGROUND_HUE,
        BACKGROUND_SATURATION,
        BACKGROUND_BRIGHTNESS
      );
      p.orbitControl(params.orbitControlSpeed, params.orbitControlSpeed);
      p.rotateX(params.rotationX);

      // Render mesh as quadrilaterals
      for (let theta = 0; theta < vRef.current.length; theta++) {
        const thetaRow = vRef.current[theta];
        if (!thetaRow) {
          continue;
        }

        const saturation = params.fillSaturationBase - theta;
        p.fill(params.fillHue, saturation, params.fillBrightness);

        for (let phi = 0; phi < thetaRow.length; phi++) {
          const currentPoint = thetaRow[phi];
          if (!currentPoint) {
            continue;
          }

          const nextThetaRow = vRef.current[theta + 1];
          const isNotLastTheta = theta < vRef.current.length - 1;
          const isNotLastPhi = phi < thetaRow.length - 1;

          if (isNotLastTheta && isNotLastPhi && nextThetaRow) {
            // Regular quadrilateral for interior mesh
            const nextPhi = thetaRow[phi + 1];
            const nextTheta = nextThetaRow[phi];
            const nextBoth = nextThetaRow[phi + 1];

            if (nextPhi && nextTheta && nextBoth) {
              p.beginShape();
              p.vertex(currentPoint.x, currentPoint.y, currentPoint.z);
              p.vertex(nextTheta.x, nextTheta.y, nextTheta.z);
              p.vertex(nextBoth.x, nextBoth.y, nextBoth.z);
              p.vertex(nextPhi.x, nextPhi.y, nextPhi.z);
              p.endShape(p.CLOSE);
            }
          } else if (
            isNotLastTheta &&
            phi === thetaRow.length - 1 &&
            nextThetaRow
          ) {
            // Wrap-around quadrilateral to close the mesh
            const firstPhi = thetaRow[0];
            const nextThetaFirstPhi = nextThetaRow[0];
            const nextThetaCurrentPhi = nextThetaRow[phi];

            if (firstPhi && nextThetaFirstPhi && nextThetaCurrentPhi) {
              p.beginShape();
              p.vertex(currentPoint.x, currentPoint.y, currentPoint.z);
              p.vertex(firstPhi.x, firstPhi.y, firstPhi.z);
              p.vertex(
                nextThetaFirstPhi.x,
                nextThetaFirstPhi.y,
                nextThetaFirstPhi.z
              );
              p.vertex(
                nextThetaCurrentPhi.x,
                nextThetaCurrentPhi.y,
                nextThetaCurrentPhi.z
              );
              p.endShape(p.CLOSE);
            }
          }
        }
      }
    },
    [paramsRef]
  );

  return <P5Canvas className={className} draw={draw} setup={setup} />;
}

/**
 * Hook to create a ref for flower parameters
 */
export function useFlowerParams(
  initialParams: FlowerParams = defaultFlowerParams
) {
  const paramsRef = useRef<FlowerParams>(initialParams);
  return paramsRef;
}
