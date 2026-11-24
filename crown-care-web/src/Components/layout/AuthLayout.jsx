import { Brand } from "../ui/Brand";

/** Dark hero on the left (top on phones) + white form card. Used by all login/register pages. */
export function AuthLayout({ heading, intro, cardTitle, children }) {
  return (
    <div className="auth">
      <div className="auth-hero">
        <Brand />
        <h1>{heading}</h1>
        <p>{intro}</p>
      </div>
      <div className="auth-side">
        <div className="auth-card">
          <h2 className="auth-card-title">{cardTitle}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
