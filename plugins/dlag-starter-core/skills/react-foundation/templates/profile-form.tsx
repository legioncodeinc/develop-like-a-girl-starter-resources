import { Form } from "react-router";

type ProfileFormProps = {
  displayName: string;
  error?: string;
  pending: boolean;
};

// Presentation only. The route action owns validation, identity and persistence.
export function ProfileForm({ displayName, error, pending }: ProfileFormProps) {
  return (
    <Form method="post" aria-busy={pending}>
      <label htmlFor="display-name">Display name</label>
      <input
        id="display-name"
        name="displayName"
        defaultValue={displayName}
        required
        maxLength={80}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "display-name-error" : undefined}
      />
      {error ? <p id="display-name-error" role="alert">{error}</p> : null}
      <button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save profile"}
      </button>
      <p role="status" aria-live="polite">{pending ? "Saving your changes." : ""}</p>
    </Form>
  );
}
