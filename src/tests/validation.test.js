const { validateLead } = require("../validation");

describe("Aplicação de testes unitários na função validateLead", () => {

  // 1. Testa um cadastro completo com todos os campos válidos
  test("Deve aceitar um cadastro completo válido", () => {
    const resultado = validateLead({
      name: "João da Silva",
      email: "joao@gmail.com",
      phone: "1234567890",
      interest: "Online"
    });

    expect(resultado.valid).toBe(true);
    expect(resultado.errors.length).toBe(0);
  });

  // 2. Testa um cadastro mínimo sem os campos opcionais
  test("Deve aceitar um cadastro mínimo válido", () => {
    const resultado = validateLead({
      name: "Ana",
      email: "ana@gmail.com"
    });

    expect(resultado.valid).toBe(true);
    expect(resultado.errors.length).toBe(0);
  });

  // 3. Testa se o sistema rejeita nomes com menos de 3 caracteres
  test("Deve rejeitar um nome muito curto", () => {
    const resultado = validateLead({
      name: "Jo",
      email: "ana@gmail.com"
    });

    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain(
      "Informe seu nome (mínimo de 3 caracteres)."
    );
  });

  // 4. Testa se o sistema rejeita nomes contendo apenas espaços
  test("Deve rejeitar um nome com espaços vazios", () => {
    const resultado = validateLead({
      name: "   ",
      email: "ana@gmail.com"
    });

    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain(
      "Informe seu nome (mínimo de 3 caracteres)."
    );
  });

  // 5. Testa se o sistema rejeita nomes que não sejam textos
  test("Deve rejeitar um nome com tipo incorreto", () => {
    const resultado = validateLead({
      name: 123,
      email: "ana@gmail.com"
    });

    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain(
      "Informe seu nome (mínimo de 3 caracteres)."
    );
  });

  // 6. Testa se o sistema rejeita e-mails inválidos
  test("Deve rejeitar um e-mail inválido", () => {
    const resultado = validateLead({
      name: "Ana",
      email: "ana@gmail"
    });

    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain("Informe um e-mail válido.");
  });

  // 7. Testa se o sistema rejeita e-mails sem domínio completo
  test("Deve rejeitar um e-mail sem domínio e sem ponto", () => {
    const resultado = validateLead({
      name: "Ana Silva",
      email: "email@email"
    });

    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain("Informe um e-mail válido.");
  });

  // 8. Testa se o sistema rejeita e-mails que não sejam textos
  test("Deve rejeitar um e-mail com tipo incorreto", () => {
    const resultado = validateLead({
      name: "Ana Silva",
      email: 12345
    });

    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain("Informe um e-mail válido.");
  });

   // 9. Testa se o sistema rejeita telefones que não sejam textos
  test("Deve rejeitar um telefone com tipo incorreto", () => {
    const resultado = validateLead({
      name: "Ana Silva",
      email: "ana@gmail.com",
      phone: 123456789
    });

    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain(
      "O telefone deve ser um texto."
    );
  });

  // 10. Testa se o sistema rejeita modalidades inexistentes
  test("Deve rejeitar uma modalidade inválida", () => {
    const resultado = validateLead({
      name: "Ana Silva",
      email: "ana@gmail.com",
      interest: "Híbrido"
    });

    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain(
      "Selecione uma modalidade válida."
    );
  });

  // 11. Testa se o sistema diferencia letras maiúsculas e minúsculas
  test("Deve rejeitar uma modalidade com letras minúsculas", () => {
    const resultado = validateLead({
      name: "Ana Silva",
      email: "ana@gmail.com",
      interest: "online"
    });

    expect(resultado.valid).toBe(false);
    expect(resultado.errors).toContain(
      "Selecione uma modalidade válida."
    );
  });

});