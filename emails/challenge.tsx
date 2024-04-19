import React from "react";
import {
	Body,
	Container,
	Head,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Font,
	Text,
	Markdown,
} from "@react-email/components";
export interface ChallengeProps {
	title: string;
	description: string;
	features: string;
	youtubeLink: string;
	unsubscribeLink: string;
}
export default function Challenge({
	title,
	description,
	features,
	youtubeLink,
	unsubscribeLink,
}: ChallengeProps) {
	return (
		<Html>
			<Head>
				<Font
					fontFamily="Bricolage Grotesque"
					fallbackFontFamily="sans-serif"
					webFont={{
						url: "https://fonts.gstatic.com/s/bricolagegrotesque/v2/3y9K6as8bTXq_nANBjzKo3IeZx8z6up5BeSl9D4dj_x9PpZBMlGFInHWVyNJtvI.woff2",
						format: "woff2",
					}}
					fontWeight={500}
					fontStyle="normal"
				/>
			</Head>
			<Body>
				<Preview>{"DailyWebCoding's Challenge"}</Preview>
				<Container>
					<Container
						style={{
							background: "#3b82f6",
							padding: "10px",
							borderRadius: "5px",
						}}
					>
						<Img
							src={`https://yt3.ggpht.com/ytc/AIdro_mziFk41QIssRMu1e7EMdOIXJpwcY1SFfa9ZKSCXV63Kw=s88-c-k-c0x00ffffff-no-rj`}
							width="42"
							height="42"
							alt="Linear"
							style={logo}
						/>
						<Text
							style={{
								color: "#fff",
							}}
						>
							DailyWebCoding
						</Text>
						<Text
							style={{
								fontWeight: "bold",
								fontSize: "2rem",
								color: "#fff",
							}}
						>
							Weekly Project 🪚
						</Text>
					</Container>
					<Text
						style={{
							fontWeight: "bold",
							fontSize: "2rem",
							paddingTop: "1rem",
						}}
					>
						{title}
					</Text>
					<Text
						style={{
							fontSize: "1.2rem",
							fontWeight: "bold",
						}}
					>
						Overview:
					</Text>
					<Text
						style={{
							fontSize: "1.2rem",
						}}
					>
						{description}
					</Text>
					<Text
						style={{
							fontSize: "1.2rem",
							fontWeight: "bold",
						}}
					>
						Key Features:
					</Text>
					<Markdown
						markdownCustomStyles={{
							h1: { color: "red" },
							h2: { color: "blue" },
							p: { fontSize: "1.2rem" },
							li: { fontSize: "1.2rem" },

							// codeInline: { background: "grey" },
						}}
					>
						{features}
					</Markdown>
					<Text
						style={{
							fontSize: "1.2rem",
							fontWeight: "bold",
						}}
					>
						More info here 👇:
					</Text>
					<a
						href={youtubeLink}
						style={{
							fontSize: "1.2rem",
						}}
					>
						https://www.youtube.com/watch?v=7eBaY957pfw
					</a>
					<Hr style={{ margin: "42px 0 26px" }} />
					<Section>
						<Link
							href="https://www.youtube.com/@DailyWebCoding"
							style={reportLink}
						>
							DailyWebCoding
						</Link>
						<a
							href={unsubscribeLink}
							style={{ marginLeft: "10px" }}
						>
							unsubscribe
						</a>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

Challenge.PreviewProps = {
	title: "Build OCR Invoice Project",
	description:
		"The problem is we have a lot of product images that I convert to invoice manually by typing the price and title and calucalet the total price. It is boring and not easy to do if we have 100+ product photos. Our goal is to convert product's image into invoice.",
	features: "- feature 1",
	youtubeLink: "https://youtu.be/_zxXv6OACkc",
	unsubscribeLink: "http://localhost:3000/unsubscribe",
} as ChallengeProps;

const logo = {
	borderRadius: 21,
	width: 42,
	height: 42,
};
const reportLink = {
	fontSize: "14px",
	color: "#b4becc",
};
