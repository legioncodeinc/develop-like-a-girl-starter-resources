# 02 Python (Django, FastAPI, Flask)

> **Read-only method.** Security Review uses Read, Grep, Glob and Skill only. Commands below are inert reference for a separately authorized caller with the required tools. Do not execute, save files, install, browse, read credentials, contact providers, or alter Git from this role. Return findings in chat. Use the local [review contract](../references/review-contract.md) for scope, data and output restrictions.

> **Conditional evidence only.** This language/framework is outside Starter launch support. Read this catalog only when the owner supplied existing code in that ecosystem; do not scaffold, install, choose or deploy it. Version-sensitive defaults require confirmation for the supplied runtime. Otherwise mark this catalog N/A and retain transferable controls in the Workers backend review.


For every path under stack id `python`. Loads [../references/ecosystems/python.md](../references/ecosystems/python.md) and [../references/cross-cutting/tool-commands.md](../references/cross-cutting/tool-commands.md).

## Steps

1. **Identify the framework** from `detect.json.details.python[]`. A path can be a library or a script collection with no web framework; then skip web checks (P8 to P15) and focus on deserialization, command execution, SQL, and secrets.
2. **Find the production settings.**
   - Django: the settings module used in production (`DJANGO_SETTINGS_MODULE` in Dockerfiles, Procfiles, `wsgi.py` / `asgi.py`). Check P8 there, not only in `settings.py` defaults [primary reference](https://docs.djangoproject.com/en/stable/topics/security/).
   - Flask: the app factory and config classes; check `SECRET_KEY`, `SESSION_COOKIE_*`, `MAX_CONTENT_LENGTH` (not set by default), `TRUSTED_HOSTS`, and any `app.run(debug=True)` reachable in production [primary reference](https://flask.palletsprojects.com/en/stable/web-security/).
   - FastAPI: app creation, middleware (CORS), routers, and dependency wiring.
3. **Map routes and auth.**
   - Django: `urls.py` to views; check `login_required`, `LoginRequiredMixin`, DRF `permission_classes` and `DEFAULT_PERMISSION_CLASSES`.
   - FastAPI: list every `@app` / `@router` route and whether it or its router carries an auth dependency; a route without one is public [primary reference](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/).
   - Flask: `@login_required` or `before_request` hooks.
4. **Run the checklist P1 to P16** using the reference's `rg` blocks. Read every production hit and trace the value to a request source.
5. **SQL.** Django ORM calls are parameterized; focus on `raw`, `extra`, `RawSQL`, `cursor.execute`, and SQLAlchemy `text()` / `execute()` with built strings (P1, P2) [primary reference](https://docs.djangoproject.com/en/stable/topics/security/).
6. **Deserialization and execution.** Every `pickle`, `yaml.load`, `subprocess(..., shell=True)`, `os.system`, `eval`, `render_template_string` hit gets a source trace (P3 to P5) [primary reference](https://docs.python.org/3/library/pickle.html) [primary reference](https://docs.python.org/3/library/subprocess.html#security-considerations).
7. **Templates.** Search templates for `|safe`, `autoescape off`, and code for `mark_safe` / `Markup` on user data, plus unquoted attributes in Jinja (P10) [primary reference](https://flask.palletsprojects.com/en/stable/web-security/).
8. **Mass assignment.** DRF serializers and Django ModelForms with `fields = "__all__"` on writable models, Pydantic models that include role or owner fields and are dumped straight into the ORM (P11) [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html).
9. **CSRF.** Django: `@csrf_exempt` on cookie-session views. Flask: no CSRF extension with cookie sessions (P9, P15).
10. **JWT and passwords.** `jwt.decode` with an explicit `algorithms` list; no disabled signature checks; Argon2 or bcrypt for passwords (P14, P16) [primary reference](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/).
11. **Dependencies.** Follow the reference's dependency section (pin status matters for pip-audit); detail in guide 10 [primary reference](https://github.com/pypa/pip-audit).
12. **Write findings** per guide 14 with `tags: ["python", "<framework>", "<class>"]`.

## Done when

Production settings were read, every route has an auth verdict, every checklist item has a result in notes, and every pattern hit in production code was read.

## Sources

[primary reference](https://docs.djangoproject.com/en/stable/topics/security/), [primary reference](https://flask.palletsprojects.com/en/stable/web-security/), [primary reference](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/), [primary reference](https://docs.python.org/3/library/pickle.html), [primary reference](https://docs.python.org/3/library/subprocess.html#security-considerations), [primary reference](https://github.com/pypa/pip-audit), [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html)
