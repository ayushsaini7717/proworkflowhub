import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
  Hr,
} from '@react-email/components';

export const WelcomeEmail = () => (
  <Html>
    <Head />
    <Preview>Welcome to the ProWorkflow Hub</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to the 1% Club.</Heading>
        <Text style={text}>
          You just took the first step towards optimizing your engineering stack.
        </Text>
        <Text style={text}>
          Every week, I break down the tools that high-performance teams at companies like Linear, Vercel, and Figma are using to ship faster.
        </Text>
        
        <Section style={box}>
          <Text style={paragraph}>
            <strong>Next Step:</strong> Check out our latest reviews to see what is trending.
          </Text>
        </Section>

        <Hr style={hr} />

        <Text style={footer}>
          ProWorkflow Hub • Designed for Builders
        </Text>
      </Container>
    </Body>
  </Html>
);

// Styles
const main = {
  backgroundColor: '#0f172a', // Slate-950 background
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '560px',
};

const h1 = {
  color: '#fff',
  fontSize: '24px',
  fontWeight: 'bold',
  paddingBottom: '20px',
  margin: '0',
};

const text = {
  color: '#cbd5e1', // Slate-300
  fontSize: '16px',
  lineHeight: '26px',
};

const box = {
  padding: '24px',
  backgroundColor: '#1e293b', // Slate-800
  borderRadius: '12px',
  marginTop: '24px',
  border: '1px solid #334155',
};

const paragraph = {
  color: '#fff',
  fontSize: '16px',
  lineHeight: '24px',
  margin: 0,
};

const hr = {
  borderColor: '#334155',
  margin: '32px 0',
};

const footer = {
  color: '#64748b',
  fontSize: '12px',
  textAlign: 'center' as const,
};