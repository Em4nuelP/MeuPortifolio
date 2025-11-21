
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Componente de Barreira de Erro para evitar a Tela Branca silenciosa
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Erro crítico na aplicação:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '20px', 
          backgroundColor: '#f3f4f6',
          color: '#1f2937',
          fontFamily: 'sans-serif',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Ops! Algo deu errado.</h1>
          <p style={{ marginBottom: '20px' }}>Não foi possível carregar o portfólio.</p>
          <pre style={{ 
            padding: '15px', 
            backgroundColor: '#e5e7eb', 
            borderRadius: '8px', 
            overflowX: 'auto',
            maxWidth: '100%',
            fontSize: '12px',
            textAlign: 'left'
          }}>
            {this.state.error?.toString()}
          </pre>
          <p style={{ marginTop: '20px', fontSize: '14px', color: '#6b7280' }}>
            Se você é o desenvolvedor, verifique o console do navegador (F12) para mais detalhes.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
