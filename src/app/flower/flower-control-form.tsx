"use client";

import { useForm } from "@tanstack/react-form";
import { Slider } from "@/components/ui/slider";
import { type FlowerParams, flowerParamsMeta } from "./schema";

type FlowerControlFormProps = {
	initialValues: FlowerParams;
	onValuesChange: (values: FlowerParams) => void;
};

export function FlowerControlForm({
	initialValues,
	onValuesChange,
}: FlowerControlFormProps) {
	const form = useForm({
		defaultValues: initialValues,
		onSubmit: ({ value }) => {
			onValuesChange(value);
		},
	});

	// Subscribe to form changes and call onValuesChange
	const handleSliderChange = (field: keyof FlowerParams, value: number[]) => {
		const newValue = value[0];
		if (newValue !== undefined) {
			form.setFieldValue(field, newValue);
			// Get current values and update
			const currentValues = form.state.values;
			onValuesChange({ ...currentValues, [field]: newValue });
		}
	};

	return (
		<div className="h-full space-y-6 overflow-y-auto p-6">
			<h2 className="font-bold text-2xl">Flower Controls</h2>

			{/* Mesh Resolution */}
			<section className="space-y-4">
				<h3 className="font-semibold text-lg">Mesh Resolution</h3>
				<FormSlider
					field="rows"
					form={form}
					meta={flowerParamsMeta.rows}
					onChange={handleSliderChange}
				/>
				<FormSlider
					field="cols"
					form={form}
					meta={flowerParamsMeta.cols}
					onChange={handleSliderChange}
				/>
				<FormSlider
					field="thetaStep"
					form={form}
					meta={flowerParamsMeta.thetaStep}
					onChange={handleSliderChange}
				/>
				<FormSlider
					field="phiStep"
					form={form}
					meta={flowerParamsMeta.phiStep}
					onChange={handleSliderChange}
				/>
			</section>

			{/* Flower Shape */}
			<section className="space-y-4">
				<h3 className="font-semibold text-lg">Flower Shape</h3>
				<FormSlider
					field="petalCount"
					form={form}
					meta={flowerParamsMeta.petalCount}
					onChange={handleSliderChange}
				/>
				<FormSlider
					field="flowerDiameter"
					form={form}
					meta={flowerParamsMeta.flowerDiameter}
					onChange={handleSliderChange}
				/>
				<FormSlider
					field="petalLength"
					form={form}
					meta={flowerParamsMeta.petalLength}
					onChange={handleSliderChange}
				/>
				<FormSlider
					field="petalSharpness"
					form={form}
					meta={flowerParamsMeta.petalSharpness}
					onChange={handleSliderChange}
				/>
			</section>

			{/* Vertical Shape */}
			<section className="space-y-4">
				<h3 className="font-semibold text-lg">Vertical Shape</h3>
				<FormSlider
					field="flowerHeight"
					form={form}
					meta={flowerParamsMeta.flowerHeight}
					onChange={handleSliderChange}
				/>
				<FormSlider
					field="curvatureExponential"
					form={form}
					meta={flowerParamsMeta.curvatureExponential}
					onChange={handleSliderChange}
				/>
				<FormSlider
					field="curvaturePolynomial"
					form={form}
					meta={flowerParamsMeta.curvaturePolynomial}
					onChange={handleSliderChange}
				/>
				<FormSlider
					field="curvaturePower"
					form={form}
					meta={flowerParamsMeta.curvaturePower}
					onChange={handleSliderChange}
				/>
				<FormSlider
					field="verticalShift"
					form={form}
					meta={flowerParamsMeta.verticalShift}
					onChange={handleSliderChange}
				/>
			</section>

			{/* Surface Texture */}
			<section className="space-y-4">
				<h3 className="font-semibold text-lg">Surface Texture</h3>
				<FormSlider
					field="bumpAmplitude"
					form={form}
					meta={flowerParamsMeta.bumpAmplitude}
					onChange={handleSliderChange}
				/>
				<FormSlider
					field="bumpFrequency"
					form={form}
					meta={flowerParamsMeta.bumpFrequency}
					onChange={handleSliderChange}
				/>
			</section>

			{/* Colors */}
			<section className="space-y-4">
				<h3 className="font-semibold text-lg">Colors</h3>
				<FormSlider
					field="fillHue"
					form={form}
					meta={flowerParamsMeta.fillHue}
					onChange={handleSliderChange}
				/>
				<FormSlider
					field="fillSaturationBase"
					form={form}
					meta={flowerParamsMeta.fillSaturationBase}
					onChange={handleSliderChange}
				/>
				<FormSlider
					field="fillBrightness"
					form={form}
					meta={flowerParamsMeta.fillBrightness}
					onChange={handleSliderChange}
				/>
			</section>

			{/* View Controls */}
			<section className="space-y-4">
				<h3 className="font-semibold text-lg">View Controls</h3>
				<FormSlider
					field="rotationX"
					form={form}
					meta={flowerParamsMeta.rotationX}
					onChange={handleSliderChange}
				/>
				<FormSlider
					field="orbitControlSpeed"
					form={form}
					meta={flowerParamsMeta.orbitControlSpeed}
					onChange={handleSliderChange}
				/>
			</section>
		</div>
	);
}

type FormSliderProps = {
	field: keyof FlowerParams;
	// biome-ignore lint/suspicious/noExplicitAny: Complex TanStack Form type with many generics
	form: any;
	meta: { label: string; min: number; max: number; step: number };
	onChange: (field: keyof FlowerParams, value: number[]) => void;
};

function FormSlider({ field, form, meta, onChange }: FormSliderProps) {
	return (
		<form.Field name={field}>
			{(
				// biome-ignore lint/suspicious/noExplicitAny: Complex TanStack Form FieldApi type with 23 generics
				fieldApi: any,
			) => {
				const value = fieldApi.state.value as number;
				return (
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<label className="font-medium text-sm" htmlFor={field}>
								{meta.label}
							</label>
							<span className="font-mono text-muted-foreground text-sm">
								{typeof value === "number" ? value.toFixed(2) : value}
							</span>
						</div>
						<Slider
							id={field}
							max={meta.max}
							min={meta.min}
							onValueChange={(newValue) => onChange(field, newValue)}
							step={meta.step}
							value={typeof value === "number" ? [value] : [0]}
						/>
					</div>
				);
			}}
		</form.Field>
	);
}
