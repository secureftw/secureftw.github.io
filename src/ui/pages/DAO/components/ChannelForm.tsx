import React from 'react';
import NumberFormat from "react-number-format";

interface IChannelFormProps{
	values: any
	onChange: (key: string, value: any) => void
}
const ChannelForm = ({values, onChange} : IChannelFormProps) => {
	return (
		<div>
			<div className="field">
				<label className="label">
					Token requirement to create a proposal
				</label>
				<div className="control">
					<NumberFormat
						placeholder={values.symbol}
						suffix={" " + values.symbol}
						thousandSeparator={true}
						allowNegative={false}
						decimalScale={0}
						inputMode="decimal"
						className="input"
						value={values.minTokens}
						onValueChange={(value) => {
							onChange("minTokens", value.value);
						}}
						// allowLeadingZeros={false}
					/>
				</div>
			</div>

			<div className="columns">
				<div className="column">
					<div className="field">
						<label className="label">Logo</label>
						<div className="control">
							<input
								placeholder="https://"
								value={values.logo}
								onChange={(e) =>
									onChange("logo", e.target.value)
								}
								className="input"
								type="text"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

};

export default ChannelForm;
