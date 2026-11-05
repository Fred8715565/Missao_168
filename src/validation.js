// Função responsável por validar os dados do formulário
function validateLead({ name, email, phone, interest }) {
  // Cria uma lista para armazenar os erros encontrados
  const errors = [];

  // Verifica se o nome é um texto e possui pelo menos 3 caracteres
  if (typeof name !== "string" || name.trim().length < 3) {
    errors.push("Informe seu nome (mínimo de 3 caracteres).");
  }

  // Expressão regular utilizada para verificar o formato do e-mail
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Verifica se o e-mail é um texto e possui um formato válido
  if (typeof email !== "string" || !emailPattern.test(email.trim())) {
    errors.push("Informe um e-mail válido.");
  }

  // Verifica se o telefone informado é um texto
  if (phone && typeof phone !== "string") {
    errors.push("O telefone deve ser um texto.");
  }

  // Lista as modalidades de interesse permitidas
  const allowedInterests = ["Online", "Presencial", "Ainda não sei"];

  // Verifica se a modalidade escolhida é válida
  if (interest && !allowedInterests.includes(interest)) {
    errors.push("Selecione uma modalidade válida.");
  }

  // Retorna se os dados são válidos e apresenta os erros encontrados
  return { valid: errors.length === 0, errors };
}

// Função responsável por organizar o filtro de modalidade dos cursos
function normalizeCourseFilter(modality) {
  // Se não houver modalidade ou a opção for "Todos", retorna null
  if (!modality || modality === "Todos") return null;

  // Lista as modalidades aceitas pelo filtro
  const allowed = ["Online", "Presencial"];

  // Retorna a modalidade se for válida; caso contrário, retorna null
  return allowed.includes(modality) ? modality : null;
}

// Exporta as funções para serem utilizadas em outros arquivos
module.exports = { validateLead, normalizeCourseFilter };