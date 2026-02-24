import { useState } from "react";

const QUESTIONS = [
	{
		id: "name",
		label: "¿Cuál es tu nombre completo?",
		type: "text",
		placeholder: "Ej. Jean René Lacoste",
	},
	{
		id: "email",
		label: "¿Cuál es tu correo electrónico?",
		type: "email",
		placeholder: "correo@ejemplo.com",
	},
	{
		id: "style",
		label: "¿Cuál es tu estilo preferido?",
		type: "select",
		options: ["Clásico", "Moderno", "Deportivo", "Elegante"],
	},
	{
		id: "size",
		label: "¿Cuál es tu talla de ropa?",
		type: "select",
		options: ["XS", "S", "M", "L", "XL", "XXL"],
	},
	{
		id: "rating_attention",
		label: "¿Cómo calificarías la atención recibida?",
		type: "stars",
	},
	{
		id: "color",
		label: "¿Cuál es tu color favorito de la colección?",
		type: "select",
		options: [
			"Blanc (Blanco)",
			"Vert (Verde)",
			"Marine (Azul marino)",
			"Rouge (Rojo)",
		],
	},
	{
		id: "rating_quality",
		label: "¿Cómo calificarías la calidad de nuestros productos?",
		type: "stars",
	},
	{
		id: "rating_experience",
		label: "¿Cómo fue tu experiencia general con Lacoste?",
		type: "stars",
	},
	{
		id: "feedback",
		label: "¿Qué es lo que más valoras de la marca?",
		type: "textarea",
		placeholder: "Comparte tu experiencia...",
	},
];

const CrocodileSVG = () => (
	<svg
		viewBox="0 0 200 120"
		xmlns="http://www.w3.org/2000/svg"
		style={{ width: "100%", height: "100%" }}
	>
		{/* Body */}
		<ellipse cx="100" cy="70" rx="75" ry="28" fill="#1a6b3a" />
		{/* Head */}
		<ellipse cx="170" cy="62" rx="28" ry="18" fill="#1a6b3a" />
		{/* Snout upper */}
		<path d="M168 50 Q195 45 198 55 Q195 60 168 62 Z" fill="#1a6b3a" />
		{/* Snout lower */}
		<path d="M168 62 Q195 60 198 65 Q195 72 168 68 Z" fill="#145530" />
		{/* Eye */}
		<circle cx="178" cy="54" r="4" fill="#f0c040" />
		<circle cx="179" cy="54" r="2" fill="#1a1a1a" />
		{/* Teeth */}
		<polygon points="172,62 175,55 178,62" fill="white" opacity="0.9" />
		<polygon points="183,62 186,56 189,62" fill="white" opacity="0.9" />
		{/* Tail */}
		<path
			d="M25 70 Q10 60 5 50 Q8 65 15 75 Q8 72 2 80 Q15 78 25 75 Z"
			fill="#1a6b3a"
		/>
		{/* Legs */}
		<ellipse
			cx="65"
			cy="96"
			rx="10"
			ry="6"
			fill="#145530"
			transform="rotate(-10 65 96)"
		/>
		<ellipse
			cx="95"
			cy="98"
			rx="10"
			ry="6"
			fill="#145530"
			transform="rotate(-5 95 98)"
		/>
		<ellipse
			cx="120"
			cy="97"
			rx="10"
			ry="6"
			fill="#145530"
			transform="rotate(5 120 97)"
		/>
		<ellipse
			cx="148"
			cy="93"
			rx="10"
			ry="6"
			fill="#145530"
			transform="rotate(10 148 93)"
		/>
		{/* Scales texture */}
		{[40, 55, 70, 85, 100, 115, 130, 145].map((x, i) => (
			<ellipse
				key={i}
				cx={x}
				cy={68}
				rx="7"
				ry="5"
				fill="none"
				stroke="#145530"
				strokeWidth="1.5"
				opacity="0.6"
			/>
		))}
		{/* Nostril */}
		<circle cx="196" cy="53" r="1.5" fill="#0d3d20" />
	</svg>
);

const STAR_LABELS = ["", "Muy malo", "Malo", "Regular", "Bueno", "Excelente"];

const StarRating = ({ value, onChange, reason, onReasonChange }) => {
	const [hovered, setHovered] = useState(0);
	// "active" se usa solo para el color/escala visual de las estrellas (hover + selección)
	// "value" es la selección real confirmada — controla si aparece el textarea
	const active = hovered || value;

	return (
		<div>
			<div style={{ display: "flex", gap: "12px", margin: "8px 0 16px" }}>
				{[1, 2, 3, 4, 5].map((star) => (
					<button
						key={star}
						onClick={() => onChange(star)}
						onMouseEnter={() => setHovered(star)}
						onMouseLeave={() => setHovered(0)}
						style={{
							background: "none",
							border: "none",
							cursor: "pointer",
							padding: 0,
							transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
							transform:
								hovered === star
									? "scale(1.3)"
									: active >= star
										? "scale(1.1)"
										: "scale(1)",
						}}
					>
						<svg
							width="40"
							height="40"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<polygon
								points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
								fill={active >= star ? "#1a6b3a" : "none"}
								stroke={active >= star ? "#1a6b3a" : "#c5c5c5"}
								strokeWidth="1.5"
								strokeLinejoin="round"
								style={{ transition: "fill 0.2s ease, stroke 0.2s ease" }}
							/>
						</svg>
					</button>
				))}
			</div>

			{/* Label del nivel — aparece siempre durante hover o selección */}
			<div
				style={{
					fontFamily: "'Raleway', sans-serif",
					fontSize: "11px",
					letterSpacing: "3px",
					textTransform: "uppercase",
					color: active <= 2 && active > 0 ? "#c0392b" : "#1a6b3a",
					fontWeight: 700,
					height: "18px",
					transition: "opacity 0.25s ease, color 0.3s ease",
					opacity: active ? 1 : 0,
				}}
			>
				{STAR_LABELS[active] || ""}
			</div>

			{/* Textarea — solo aparece cuando hay una estrella SELECCIONADA (value), no en hover */}
			{value > 0 && (
				<div
					style={{
						marginTop: "28px",
						animation: "slideUp 0.35s cubic-bezier(0.4,0,0.2,1) forwards",
					}}
				>
					<div
						style={{
							fontFamily: "'Raleway', sans-serif",
							fontSize: "11px",
							letterSpacing: "2.5px",
							textTransform: "uppercase",
							fontWeight: 700,
							marginBottom: "10px",
							color: value <= 2 ? "#c0392b" : "#888",
							display: "flex",
							alignItems: "center",
							gap: "6px",
						}}
					>
						{value <= 2
							? "¿Por qué? (obligatorio)"
							: "¿Quieres contarnos más? (opcional)"}
						{value <= 2 && (
							<span style={{ color: "#c0392b", fontSize: "14px" }}>*</span>
						)}
					</div>
					<textarea
						style={{
							width: "100%",
							background: "transparent",
							border: "none",
							borderBottom:
								value <= 2
									? "1.5px solid rgba(192,57,43,0.5)"
									: "1.5px solid rgba(26,107,58,0.25)",
							padding: "10px 0",
							fontFamily: "'Raleway', sans-serif",
							fontSize: "14px",
							color: "#1a1a1a",
							outline: "none",
							resize: "none",
							height: "70px",
							transition: "border-color 0.3s ease",
							fontWeight: 400,
						}}
						placeholder={
							value <= 2
								? "Cuéntanos qué salió mal..."
								: "Comparte tu experiencia..."
						}
						value={reason}
						onChange={(e) => onReasonChange(e.target.value)}
					/>
				</div>
			)}
		</div>
	);
};

export default function LacosteForm() {
	const [current, setCurrent] = useState(0);
	const [answers, setAnswers] = useState({});
	const [animKey, setAnimKey] = useState(0);
	const [status, setStatus] = useState("idle"); // idle | loading | success | error

	const q = QUESTIONS[current];
	const progress = (current / QUESTIONS.length) * 100;
	const value = answers[q?.id] || "";

	const handleChange = (val) => {
		setAnswers((prev) => ({ ...prev, [q.id]: val }));
	};

	const goNext = () => {
		if (current < QUESTIONS.length - 1) {
			setAnimKey((k) => k + 1);
			setCurrent((c) => c + 1);
		} else {
			handleSubmit();
		}
	};

	const goBack = () => {
		if (current > 0) {
			setAnimKey((k) => k + 1);
			setCurrent((c) => c - 1);
		}
	};

	const handleSubmit = async () => {
		setStatus("loading");
		try {
			// Reemplaza esta URL con tu endpoint real
			const res = await fetch("https://tu-endpoint.com/api/form", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(answers),
			});
			if (res.ok) {
				setStatus("success");
			} else {
				setStatus("error");
			}
		} catch {
			// Para demo, mostramos success igual
			setStatus("success");
		}
	};

	return (
		<>
			<div className="form-bg">
				<div className="croc-bg">
					<CrocodileSVG />
				</div>

				<div className="form-card">
					<div className="brand-header">
						<div className="brand-croc">
							<CrocodileSVG />
						</div>
						<span className="brand-name">Lacoste</span>
					</div>

					{status === "success" ? (
						<div className="success-state">
							<div className="success-croc">
								<CrocodileSVG />
							</div>
							<div className="success-title">Merci beaucoup</div>
							<p className="success-msg">
								Tus respuestas han sido enviadas exitosamente.
								<br />
								El equipo de Lacoste te contactará pronto.
							</p>
						</div>
					) : status === "loading" ? (
						<div className="success-state">
							<p style={{ fontSize: 22, color: "#1a6b3a", letterSpacing: 3 }}>
								<span className="loading-dot">·</span>
								<span className="loading-dot">·</span>
								<span className="loading-dot">·</span>
							</p>
							<p
								style={{
									marginTop: 16,
									color: "#666",
									fontSize: 14,
									letterSpacing: 1,
								}}
							>
								Enviando respuestas
							</p>
						</div>
					) : (
						<>
							<div className="progress-bar-bg">
								<div
									className="progress-bar-fill"
									style={{ width: `${progress}%` }}
								/>
							</div>

							<div key={animKey} className="question-enter">
								<div className="step-indicator">
									{String(current + 1).padStart(2, "0")} /{" "}
									{String(QUESTIONS.length).padStart(2, "0")}
								</div>
								<div className="question-label">{q.label}</div>

								{q.type === "text" || q.type === "email" ? (
									<input
										className="form-input"
										type={q.type}
										placeholder={q.placeholder}
										value={value}
										onChange={(e) => handleChange(e.target.value)}
										autoFocus
									/>
								) : q.type === "select" ? (
									<select
										className="form-select"
										value={value}
										onChange={(e) => handleChange(e.target.value)}
									>
										<option value="">Selecciona una opción</option>
										{q.options.map((opt) => (
											<option key={opt} value={opt}>
												{opt}
											</option>
										))}
									</select>
								) : q.type === "stars" ? (
									<StarRating
										value={value || 0}
										onChange={(val) => {
											handleChange(val);
											// Reset reason when changing rating
											setAnswers((prev) => ({
												...prev,
												[q.id + "_reason"]: "",
											}));
										}}
										reason={answers[q.id + "_reason"] || ""}
										onReasonChange={(txt) =>
											setAnswers((prev) => ({
												...prev,
												[q.id + "_reason"]: txt,
											}))
										}
									/>
								) : (
									<textarea
										className="form-textarea"
										placeholder={q.placeholder}
										value={value}
										onChange={(e) => handleChange(e.target.value)}
										autoFocus
									/>
								)}
							</div>

							<div className="btn-row">
								{current > 0 ? (
									<button className="btn-back" onClick={goBack}>
										← Anterior
									</button>
								) : (
									<span />
								)}
								<button
									className="btn-next"
									onClick={goNext}
									disabled={
										!value ||
										(q.type === "stars" &&
											value <= 2 &&
											!(answers[q.id + "_reason"] || "").trim())
									}
								>
									{current === QUESTIONS.length - 1 ? "Enviar" : "Continuar →"}
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}