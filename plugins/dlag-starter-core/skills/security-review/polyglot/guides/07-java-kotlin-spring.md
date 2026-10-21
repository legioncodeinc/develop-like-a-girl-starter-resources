# 07 Java and Kotlin (Spring Boot)

> **Read-only method.** Security Review uses Read, Grep, Glob and Skill only. Commands below are inert reference for a separately authorized caller with the required tools. Do not execute, save files, install, browse, read credentials, contact providers, or alter Git from this role. Return findings in chat. Use the local [review contract](../references/review-contract.md) for scope, data and output restrictions.

> **Conditional evidence only.** This language/framework is outside Starter launch support. Read this catalog only when the owner supplied existing code in that ecosystem; do not scaffold, install, choose or deploy it. Version-sensitive defaults require confirmation for the supplied runtime. Otherwise mark this catalog N/A and retain transferable controls in the Workers backend review.


For every path under stack id `java-kotlin`. Loads [../references/ecosystems/java-kotlin.md](../references/ecosystems/java-kotlin.md) and [../references/cross-cutting/tool-commands.md](../references/cross-cutting/tool-commands.md).

## Steps

1. **Identify the framework** from `detect.json.details.java-kotlin[]` (spring-boot with version, spring-security, quarkus, micronaut, ktor) and the language (Java, Kotlin). For non-Spring frameworks apply the same checklist classes and say in notes that the Spring-specific rows did not apply.
2. **Do not run the build** (`mvn`, `./gradlew`) unless the run allows it: build scripts execute code. Read the build files instead.
3. **Read the security configuration.** Find `SecurityFilterChain` beans (or older `WebSecurityConfigurerAdapter` subclasses): CSRF setting, `authorizeHttpRequests` rules and the final `anyRequest()` rule, CORS, session policy, password encoder (J7, J8, J14, J15) [primary reference](https://docs.spring.io/spring-security/reference/servlet/exploits/csrf.html).
4. **Read the application config.** `application*.properties` / `.yml` for each profile: actuator exposure and `show-values`, H2 console, credentials, server port vs management port (J9, J13) [primary reference](https://docs.spring.io/spring-boot/reference/actuator/endpoints.html).
5. **Map controllers.** `@RestController` / `@Controller` methods with their mappings, `@PreAuthorize` / `@Secured`, and which ones bind entities directly (J6) [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html).
6. **Run the checklist J1 to J15** with the reference's `rg` blocks; read each production hit.
7. **Query building.** String-built JPQL, native queries, and `JdbcTemplate` calls (J1, J2).
8. **Deserialization and XML.** `ObjectInputStream`, `XMLDecoder`, XStream, permissive Jackson default typing, SnakeYAML on untrusted input (J4) [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html); XML factories without external-entity protection (J5, read the factory setup; parser flags are a thin spot in these reference notes).
9. **Commands, files, SSRF, templates.** J3, J10, J11, J12.
10. **Dependencies.** osv-scanner on pom.xml or Gradle lockfiles; Gradle without locking is a recorded cap (guide 10) [primary reference](https://google.github.io/osv-scanner/supported-languages-and-lockfiles/).
11. **Write findings** per guide 14 with `tags: ["java-kotlin", "spring-boot", "<class>"]`.

## Done when

The security filter chain and every profile's config were read, controllers have auth verdicts, every checklist item has a result in notes, and every production hit was read.

## Sources

[primary reference](https://docs.spring.io/spring-security/reference/servlet/exploits/csrf.html), [primary reference](https://docs.spring.io/spring-boot/reference/actuator/endpoints.html), [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html), [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html), [primary reference](https://google.github.io/osv-scanner/supported-languages-and-lockfiles/)
