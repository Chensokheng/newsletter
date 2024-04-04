import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Text,
} from "@react-email/components";
import * as React from "react";

interface LinearLoginCodeEmailProps {
	verifyLink: string;
}

const baseUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "";

export const LinearLoginCodeEmail = ({
	verifyLink,
}: LinearLoginCodeEmailProps) => (
	<Html>
		<Head />
		<Preview>DailyWebCoding-Newsletter Confirmation</Preview>
		<Body style={main}>
			<Container style={container}>
				<Img
					src={`https://yt3.ggpht.com/ytc/AIdro_mziFk41QIssRMu1e7EMdOIXJpwcY1SFfa9ZKSCXV63Kw=s88-c-k-c0x00ffffff-no-rj`}
					width="42"
					height="42"
					alt="Linear"
					style={logo}
				/>
				<Text style={heading}>
					{"Confirm Subscribe to DailyWebCoding's Newsletter"}
				</Text>
				<Text style={paragraph}>👇 click on this</Text>
				<Link href="verifyLink" style={button}>
					Confirm
				</Link>
				<Text>
					or copy and paste this URL into your browser:
					<br />
					{verifyLink}
				</Text>
				<Text style={paragraph}>
					If you did not request this, please ignore this email.
				</Text>
				<Hr style={hr} />
				<Link
					href="https://www.youtube.com/@DailyWebCoding"
					style={reportLink}
				>
					DailyWebCoding
				</Link>
			</Container>
		</Body>
	</Html>
);

LinearLoginCodeEmail.PreviewProps = {
	verifyLink: "http://localhost:3000",
} as LinearLoginCodeEmailProps;

export default LinearLoginCodeEmail;

const logo = {
	borderRadius: 21,
	width: 42,
	height: 42,
};

const main = {
	backgroundColor: "#ffffff",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
	margin: "0 auto",
	padding: "20px 0 48px",
	maxWidth: "560px",
};

const heading = {
	fontSize: "24px",
	letterSpacing: "-0.5px",
	lineHeight: "1.3",
	fontWeight: "400",
	color: "#484848",
	padding: "17px 0 0",
};

const paragraph = {
	margin: "0 0 15px",
	fontSize: "15px",
	lineHeight: "1.4",
	color: "#3c4149",
};

const buttonContainer = {
	backgroundColor: "#5e6ad2",
};

const button = {
	backgroundColor: "#5e6ad2",
	borderRadius: "3px",
	fontWeight: "600",
	color: "#fff",
	fontSize: "15px",
	textDecoration: "none",
	textAlign: "center" as const,
	display: "block",
	padding: "11px 23px",
};

const reportLink = {
	fontSize: "14px",
	color: "#b4becc",
};

const hr = {
	borderColor: "#dfe1e4",
	margin: "42px 0 26px",
};

const code = {
	fontFamily: "monospace",
	fontWeight: "700",
	padding: "1px 4px",
	backgroundColor: "#dfe1e4",
	letterSpacing: "-0.3px",
	fontSize: "21px",
	borderRadius: "4px",
	color: "#3c4149",
};
