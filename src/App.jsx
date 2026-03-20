import { useState } from "react";

const sections = [
  { id: "summary", label: "1. Resumo Executivo" },
  { id: "overview", label: "2. Visão Geral do Sistema" },
  { id: "layers", label: "3. Camadas de Arquitetura" },
  { id: "admin", label: "4. Administração de Entidades" },
  { id: "roles", label: "5. Papéis e Responsabilidades" },
  { id: "workflow", label: "6. Fluxo End-to-End" },
  { id: "statemachine", label: "7. Máquina de Estados" },
  { id: "doclifecycle", label: "8. Ciclo de Vida de Documentos" },
  { id: "signatures", label: "9. Arquitetura de Assinaturas" },
  { id: "traceability", label: "10. Portal de Rastreabilidade" },
  { id: "scenario", label: "11. Cenário de Exemplo" },
];

// ─── THEME ───────────────────────────────────────────────────────────────────
const T = {
  bg: "#f8fafc",
  sidebar: "#ffffff",
  sidebarBorder: "#e2e8f0",
  card: "#ffffff",
  cardBorder: "#e2e8f0",
  text: "#0f172a",
  textSub: "#475569",
  textMuted: "#94a3b8",
  highlight: "#eef2ff",
  highlightBorder: "#c7d2fe",
  highlightText: "#3730a3",
  accent: "#4f46e5",
  accentLight: "#eef2ff",
  tableHead: "#f1f5f9",
  tableHeadText: "#475569",
  rowBorder: "#f1f5f9",
};

const content = {
  summary: {
    title: "1. Resumo Executivo",
    body: [
      { type: "paragraph", text: "O Sistema de Gestão de Inspeções é uma plataforma enterprise multicanal projetada para orquestrar fluxos complexos de inspeção técnica, desde a criação de demandas até a emissão de certificados digitais com validade jurídica. O sistema opera em três plataformas complementares: uma aplicação web responsiva multi-papel, um aplicativo mobile com operação offline-first e um portal dedicado ao cliente externo." },
      { type: "paragraph", text: "O produto é classificado como de alta complexidade técnica e operacional, envolvendo: múltiplos perfis de usuário com permissões distintas, motor de workflows com máquina de estados, motor de checklists dinâmicos, geração automatizada de documentos, fluxo multi-nível de assinaturas e um Portal de Rastreabilidade acessível a auditores e órgãos reguladores." },
      { type: "highlight", text: "O objetivo central é garantir rastreabilidade completa, conformidade técnica e institucional em cada inspeção realizada, com emissão de certificados digitais ICP-Brasil e cadeia de evidências auditável por órgãos reguladores como INMETRO e ANTT." },
      { type: "metrics", items: [
        { label: "Plataformas", value: "4" },
        { label: "Papéis de usuário", value: "6" },
        { label: "Tipos de documento", value: "7" },
        { label: "Níveis de assinatura", value: "4" },
      ]}
    ]
  },
  overview: {
    title: "2. Visão Geral do Sistema",
    body: [
      { type: "subtitle", text: "2.1 Plataformas" },
      { type: "table", headers: ["Plataforma", "Usuários", "Função Principal"], rows: [
        ["Web Responsivo", "Gestora, Coordenador, RT, Inspetor", "Configuração, controle de fluxo, validação e monitoramento"],
        ["Mobile App (iOS/Android)", "Inspetor", "Execução de inspeções offline, preenchimento de checklists, sincronização"],
        ["Portal do Cliente", "Cliente externo", "Visualização de relatórios, aprovação ou solicitação de ajustes"],
        ["Portal de Rastreabilidade", "Auditores, INMETRO, ANTT e órgãos reguladores", "Acesso à cadeia de evidências via link seguro ou QR Code"],
      ]},
      { type: "subtitle", text: "2.2 Interações Principais" },
      { type: "flow", steps: [
        "Gestora cria a demanda com todas as informações: contrato, escopo, prazo, inspetor designado",
        "Coordenador recebe notificação de novo projeto atribuído e cria o Plano de Inspeção",
        "Coordenador seleciona uma 'boneca' (template base) e personaliza o checklist conforme a demanda",
        "Inspetor executa no campo (mobile offline) ou na web",
        "Dados sincronizados disparam fluxo de validação",
        "Coordenador e RT validam tecnicamente",
        "Sistema gera Relatório Parcial",
        "Cliente revisa e aprova (ou solicita ajustes)",
        "Assinatura ICP-Brasil coletada — Sistema gera Relatório Final e Certificado",
        "Cadeia de evidências disponível no Portal de Rastreabilidade"
      ]},
      { type: "subtitle", text: "2.3 Princípios de Design do Sistema" },
      { type: "list", items: [
        "Offline-first: o inspetor nunca é bloqueado por falta de conectividade",
        "Rastreabilidade completa: toda ação é registrada em trilha de auditoria imutável",
        "Separação de responsabilidades: cada papel possui escopos bem definidos e não sobrepostos",
        "Documentos como entidades versionadas: nenhum documento é sobrescrito, apenas retificado",
        "Fluxo orquestrado por máquina de estados: transições previsíveis e auditáveis",
        "Auditabilidade externa: cadeia de evidências acessível a reguladores via Portal de Rastreabilidade"
      ]}
    ]
  },
  layers: { title: "3. Camadas de Arquitetura", body: [{ type: "arch_interactive" }] },
  admin: {
    title: "4. Administração de Entidades",
    body: [
      { type: "paragraph", text: "O módulo de Administração centraliza o gerenciamento de todos os atores do sistema: inspetores, coordenadores, responsáveis técnicos e gestores de projeto. É operado por um perfil administrativo com acesso irrestrito às entidades da plataforma." },
      { type: "subtitle", text: "4.1 Gestão de Usuários e Perfis" },
      { type: "table", headers: ["Entidade", "Campos Principais", "Ações Disponíveis"], rows: [
        ["Inspetor", "Nome, CREA/CAU, especialidades, localização, disponibilidade, histórico de inspeções", "Cadastrar, editar, ativar/inativar, vincular a coordenador, visualizar histórico"],
        ["Coordenador", "Nome, credenciais, área de atuação, rede de inspetores sob gestão", "Cadastrar, editar, ativar/inativar, definir rede de inspetores"],
        ["Responsável Técnico (RT)", "Nome, registro profissional, especialidade técnica, validade do registro", "Cadastrar, editar, validar registro, vincular a projetos"],
        ["Gestor de Projetos", "Nome, permissões de gestão, projetos sob responsabilidade", "Cadastrar, editar, definir escopo de acesso"],
        ["Auditor Externo", "Nome, órgão, credenciais, nível de acesso ao Portal de Rastreabilidade", "Cadastrar, emitir link/QR Code de acesso, definir escopo de consulta"],
      ]},
      { type: "subtitle", text: "4.2 Gestão de Projetos (pelo Gestor)" },
      { type: "paragraph", text: "O Gestor de Projetos possui uma área dedicada para criação e acompanhamento completo de projetos. Cada projeto é uma entidade rica que centraliza todas as informações contratuais e operacionais." },
      { type: "list", items: [
        "Criação do projeto com nome, descrição, cliente vinculado e código interno",
        "Upload e gestão de contrato: documento contratual, número, vigência, valor e cláusulas especiais",
        "Definição de escopo técnico: tipos de inspeção, normas aplicáveis, critérios de aprovação",
        "Atribuição de inspetor(es) responsáveis pelo projeto",
        "Definição de prazos globais e marcos intermediários",
        "Configuração de SLAs e alertas automáticos por etapa",
        "Campos personalizáveis por tipo de projeto (ex: número de protocolo, órgão regulador, localização da obra)",
        "Histórico completo de atividades do projeto com trilha de auditoria",
        "Painel de acompanhamento em tempo real: inspeções em andamento, pendências e métricas",
      ]},
      { type: "subtitle", text: "4.3 Estrutura Hierárquica" },
      { type: "org_chart" },
    ]
  },
  roles: {
    title: "5. Papéis e Responsabilidades",
    body: [
      { type: "roles", items: [
        { role: "Gestora de Projetos", icon: "👩‍💼", color: "#4f46e5", permissions: ["Criar e gerenciar demandas de inspeção com informações completas","Vincular contrato, escopo técnico e cliente ao projeto","Atribuir inspetores a demandas","Monitorar progresso e SLAs em tempo real","Visualizar dashboards de desempenho","Gerar relatórios gerenciais","Configurar alertas e prazos"], platforms: ["Web"], restrictions: ["Não executa validações técnicas","Não edita planos de inspeção ou checklists"] },
        { role: "Coordenador de Inspeção", icon: "🗂️", color: "#7c3aed", permissions: ["Receber notificação de projeto atribuído pela Gestora","Criar o Plano de Inspeção a partir de uma 'boneca' (template base)","Personalizar checklist dinâmico conforme a demanda","Definir regras de preenchimento e validação","Realizar primeira validação técnica","Aprovar ou rejeitar inspeções","Solicitar complementações ao inspetor","Gerenciar sua rede de inspetores"], platforms: ["Web"], restrictions: ["Não atribui inspetores a projetos","Não tem acesso ao portal do cliente"] },
        { role: "Responsável Técnico (RT)", icon: "🏛️", color: "#1d4ed8", permissions: ["Validar tecnicamente inspeções aprovadas pelo coordenador","Aprovar ou rejeitar com justificativa técnica","Assinar documentos com validade institucional","Emitir parecer técnico","Autorizar geração de relatório parcial","Acesso a histórico completo de inspeções"], platforms: ["Web"], restrictions: ["Não edita checklists","Não acessa portal do cliente"] },
        { role: "Inspetor", icon: "🔍", color: "#059669", permissions: ["Executar inspeções designadas","Preencher checklists (web e mobile)","Capturar fotos, vídeos e documentos como evidência","Registrar localização GPS das inspeções","Operar completamente offline no mobile","Visualizar histórico de suas próprias inspeções"], platforms: ["Web", "Mobile"], restrictions: ["Não valida inspeções de outros","Não gera relatórios finais","Não acessa dados de outros inspetores"] },
        { role: "Cliente", icon: "🏢", color: "#b45309", permissions: ["Visualizar relatório parcial gerado","Aprovar inspeção (dispara fluxo de assinatura ICP-Brasil)","Solicitar ajustes com comentários detalhados","Acompanhar status de sua inspeção","Baixar documentos finais aprovados","Assinar relatório final e certificado via ICP-Brasil"], platforms: ["Portal do Cliente"], restrictions: ["Não acessa dados de outras inspeções","Não interage com fluxo interno","Participa apenas após validações internas concluídas"] },
        { role: "Auditor / Órgão Regulador", icon: "🔎", color: "#0369a1", permissions: ["Acessar cadeia de evidências via link seguro ou QR Code","Visualizar documentos, assinaturas e trilha de auditoria","Consultar histórico completo de uma inspeção","Verificar autenticidade de certificados emitidos","Exportar relatório de auditoria em formato estruturado","Filtrar por período, inspetor, tipo de inspeção ou projeto"], platforms: ["Portal de Rastreabilidade"], restrictions: ["Acesso somente leitura","Não interfere no fluxo de inspeções","Acesso limitado ao escopo definido pelo Administrador"] },
      ]}
    ]
  },
  workflow: {
    title: "6. Fluxo End-to-End",
    body: [
      { type: "subtitle", text: "6.1 Fluxo Normal (Caminho Feliz)" },
      { type: "workflow", steps: [
        { num: "01", actor: "Gestora", action: "Cria a demanda de inspeção", detail: "Preenche todas as informações do projeto: cliente, contrato, escopo técnico, normas aplicáveis, prazo, inspetor designado e dados complementares", state: "Demanda Criada" },
        { num: "02", actor: "Coordenador", action: "Recebe notificação e cria o Plano de Inspeção", detail: "Acessa o projeto atribuído, seleciona uma 'boneca' (template base) e personaliza o checklist de acordo com as especificidades da demanda", state: "Plano Criado" },
        { num: "03", actor: "Inspetor", action: "Recebe notificação e inicia inspeção", detail: "Baixa dados offline no mobile ou acessa via web, confere itens do plano de inspeção", state: "Em Execução" },
        { num: "04", actor: "Inspetor", action: "Preenche checklist e registra evidências", detail: "Responde itens, captura fotos/vídeos, registra GPS, anota observações", state: "Em Execução" },
        { num: "05", actor: "Sistema", action: "Sincroniza dados e valida completude", detail: "Ao ganhar conectividade, sincroniza dados offline. Valida campos obrigatórios e regras", state: "Processando" },
        { num: "06", actor: "Coordenador", action: "Realiza validação técnica de primeiro nível", detail: "Revisa respostas, evidências e conformidade com o plano de inspeção. Aprova ou rejeita", state: "Validação Coordenador" },
        { num: "07", actor: "RT", action: "Realiza validação técnica institucional", detail: "Valida aspectos técnicos e normativos. Emite parecer e aprova com log de validação sistêmica", state: "Validação RT" },
        { num: "08", actor: "Sistema", action: "Gera Relatório Parcial", detail: "Compila dados da inspeção em documento estruturado com todas as evidências", state: "Relatório Parcial Gerado" },
        { num: "09", actor: "Cliente", action: "Revisa e aprova Relatório Parcial", detail: "Acessa portal, visualiza relatório completo e aprova. A aprovação dispara o fluxo de assinatura ICP-Brasil", state: "Aprovação do Cliente" },
        { num: "10", actor: "Sistema + Signatários", action: "Coleta assinaturas ICP-Brasil e gera documentos finais", detail: "Coordenador, RT e Cliente assinam digitalmente via ICP-Brasil. Sistema gera Relatório Final e Certificado", state: "Finalizado" },
        { num: "11", actor: "Sistema", action: "Publica cadeia de evidências no Portal de Rastreabilidade", detail: "QR Code e link único gerados. Auditores e órgãos reguladores podem acessar toda a cadeia de evidências", state: "Auditável" },
      ]},
      { type: "subtitle", text: "6.2 Fluxo de Rejeição e Retrabalho" },
      { type: "rejection", steps: [
        { from: "Cliente", action: "Rejeita relatório parcial com comentários", to: "Sistema" },
        { from: "Sistema", action: "Cria ciclo de ajuste e notifica Coordenador", to: "Coordenador" },
        { from: "Coordenador", action: "Analisa comentários e retorna para Inspetor ou faz ajuste direto", to: "Inspetor / Próprio" },
        { from: "Inspetor", action: "Realiza complementação: novas evidências, correção de respostas", to: "Sistema" },
        { from: "Sistema", action: "Reinicia fluxo de validação (Coordenador → RT → Cliente)", to: "Coordenador" },
      ]}
    ]
  },
  statemachine: {
    title: "7. Máquina de Estados",
    body: [
      { type: "paragraph", text: "Cada inspeção possui um estado bem definido que determina quais ações são permitidas, quem pode executá-las e quais transições estão disponíveis. A máquina de estados é o coração do sistema de controle de fluxo." },
      { type: "states", items: [
        { label: "DEMANDA CRIADA", color: "#64748b", desc: "Gestora criou a demanda com todas as informações. Coordenador notificado para criar o Plano de Inspeção.", triggers: ["Coordenador cria Plano de Inspeção → PLANO_CRIADO", "Gestora cancela → CANCELADA"] },
        { label: "PLANO CRIADO", color: "#4f46e5", desc: "Coordenador selecionou a boneca e personalizou o plano. Inspetor notificado.", triggers: ["Inspetor inicia inspeção → EM_EXECUÇÃO", "Gestora cancela → CANCELADA"] },
        { label: "EM EXECUÇÃO", color: "#7c3aed", desc: "Inspetor está preenchendo o checklist. Pode operar offline.", triggers: ["Inspetor submete checklist completo → PENDENTE_VALIDAÇÃO_COORD", "Gestora cancela → CANCELADA"] },
        { label: "PENDENTE VALIDAÇÃO COORD.", color: "#b45309", desc: "Aguardando análise e aprovação do Coordenador de Inspeção.", triggers: ["Coordenador aprova → PENDENTE_VALIDAÇÃO_RT", "Coordenador rejeita → EM_AJUSTE (Inspetor)"] },
        { label: "EM AJUSTE (INSPETOR)", color: "#dc2626", desc: "Inspetor realizando correções solicitadas pelo Coordenador.", triggers: ["Inspetor resubmete → PENDENTE_VALIDAÇÃO_COORD"] },
        { label: "PENDENTE VALIDAÇÃO RT", color: "#b45309", desc: "Aguardando análise e aprovação do Responsável Técnico.", triggers: ["RT aprova → RELATÓRIO_PARCIAL_GERADO", "RT rejeita → EM_AJUSTE (Coord.)"] },
        { label: "EM AJUSTE (COORD.)", color: "#dc2626", desc: "Coordenador realizando ajustes solicitados pelo RT.", triggers: ["Coord. resubmete → PENDENTE_VALIDAÇÃO_RT"] },
        { label: "RELATÓRIO PARCIAL GERADO", color: "#059669", desc: "Relatório parcial gerado automaticamente. Enviado ao cliente.", triggers: ["Sistema envia ao cliente → PENDENTE_APROVAÇÃO_CLIENTE"] },
        { label: "PENDENTE APROVAÇÃO CLIENTE", color: "#d97706", desc: "Cliente analisando o relatório parcial no portal.", triggers: ["Cliente aprova → COLETANDO_ASSINATURAS_ICP", "Cliente rejeita → EM_REVISÃO_CLIENTE"] },
        { label: "EM REVISÃO (CLIENTE)", color: "#dc2626", desc: "Ciclo de ajuste iniciado por rejeição do cliente.", triggers: ["Coord. resubmete após ajustes → PENDENTE_VALIDAÇÃO_RT"] },
        { label: "COLETANDO ASSINATURAS ICP-BRASIL", color: "#0369a1", desc: "Aprovação do cliente dispara fluxo de assinatura ICP-Brasil.", triggers: ["Todas as assinaturas coletadas → FINALIZADO"] },
        { label: "FINALIZADO", color: "#1e293b", desc: "Inspeção concluída. Relatório Final e Certificado assinados via ICP-Brasil.", triggers: ["Estado terminal — cadeia de evidências disponível para auditores"] },
        { label: "CANCELADA", color: "#94a3b8", desc: "Inspeção cancelada pela Gestora. Auditoria preservada.", triggers: ["Estado terminal — auditoria preservada"] },
      ]}
    ]
  },
  doclifecycle: {
    title: "8. Ciclo de Vida de Documentos",
    body: [
      { type: "paragraph", text: "Todos os documentos gerados pelo sistema são tratados como entidades versionadas e imutáveis. Nenhum documento aprovado pode ser sobrescrito — apenas novas versões (retificações) podem ser criadas." },
      { type: "subtitle", text: "8.1 Tipos de Documentos" },
      { type: "table", headers: ["Documento", "Gerado por", "Momento de Geração", "Assinaturas Necessárias"], rows: [
        ["Demanda de Inspeção", "Gestora", "No início do projeto", "Gestora"],
        ["Plano de Inspeção", "Coordenador", "Após criação da demanda", "Coordenador"],
        ["Checklist de Inspeção", "Sistema (baseado no plano)", "Durante execução", "Inspetor"],
        ["Relatório de Visita", "Sistema", "Após execução", "Inspetor + Coordenador"],
        ["Relatório Parcial", "Sistema", "Após validação RT", "Log sistêmico (Coordenador + RT)"],
        ["Relatório Final", "Sistema", "Após aprovação do Cliente + ICP-Brasil", "Coordenador (ICP) + RT (ICP) + Cliente (ICP)"],
        ["Certificado de Inspeção", "Sistema", "Após relatório final", "RT (ICP) + Cliente (ICP)"],
      ]},
      { type: "subtitle", text: "8.2 Estados de um Documento" },
      { type: "flow", steps: [
        "RASCUNHO — documento em montagem pelo sistema ou pelo usuário",
        "GERADO — compilação concluída, aguardando primeira assinatura ou log",
        "EM VALIDAÇÃO — circulando pelo fluxo interno de aprovações",
        "VALIDADO — aprovações internas concluídas (log sistêmico registrado)",
        "ASSINADO ICP-BRASIL — assinaturas digitais ICP coletadas (apenas Relatório Final e Certificado)",
        "PUBLICADO — disponível para partes autorizadas e/ou Portal de Rastreabilidade",
        "RETIFICADO — versão anterior de documento revisado (arquivado, substituído por nova versão)"
      ]},
      { type: "subtitle", text: "8.3 Versionamento" },
      { type: "paragraph", text: "Cada documento possui identificador único (UUID), número de versão semântico (v1.0, v1.1, v2.0), hash de integridade (SHA-256), metadados de criação/modificação e referência ao documento anterior quando aplicável. Documentos na versão v2.0+ indicam que houve ciclo de rejeição e retificação." }
    ]
  },
  signatures: {
    title: "9. Arquitetura de Assinaturas",
    body: [
      { type: "paragraph", text: "O sistema implementa dois regimes de assinatura claramente distintos: assinaturas de validação sistêmica (logs de aprovação internos) e assinaturas digitais ICP-Brasil (com validade jurídica plena). A assinatura ICP-Brasil é acionada exclusivamente após a aprovação do cliente." },
      { type: "subtitle", text: "9.1 Regime 1 — Validações Sistêmicas (Fluxo Interno)" },
      { type: "paragraph", text: "As etapas internas do fluxo — submissão do inspetor, aprovação do coordenador e aprovação do RT — são registradas como logs de validação sistêmica. Não constituem assinatura digital com validade jurídica, mas formam trilha de auditoria imutável e rastreável." },
      { type: "signature_levels", items: [
        { level: "Log 1", name: "Submissão de Execução", actor: "Inspetor", type: "Log sistêmico autenticado", desc: "Confirma que o inspetor executou e submeteu o checklist. Registra identidade, timestamp e hash dos dados de inspeção." },
        { level: "Log 2", name: "Validação do Coordenador", actor: "Coordenador", type: "Log sistêmico autenticado", desc: "Confirma revisão técnica do coordenador. Inclui carimbo de data/hora, IP de origem e identificador da sessão." },
        { level: "Log 3", name: "Validação do RT", actor: "Responsável Técnico (RT)", type: "Log sistêmico com credencial RT", desc: "Validação com credencial de RT registrada. Inclui parecer técnico e garante responsabilidade técnica rastreável internamente." },
      ]},
      { type: "subtitle", text: "9.2 Regime 2 — Assinaturas ICP-Brasil (Pós-Aprovação do Cliente)" },
      { type: "highlight", text: "A aprovação do cliente no Portal é o gatilho exclusivo para o início do fluxo de assinaturas ICP-Brasil. Somente após essa aprovação o sistema coleta assinaturas digitais com validade jurídica plena para o Relatório Final e o Certificado de Inspeção." },
      { type: "signature_levels", items: [
        { level: "ICP 1", name: "Assinatura do Coordenador", actor: "Coordenador", type: "Assinatura Digital ICP-Brasil", desc: "Primeira assinatura ICP sobre o Relatório Final. Confirma responsabilidade técnica pela condução do processo de inspeção." },
        { level: "ICP 2", name: "Assinatura do RT", actor: "Responsável Técnico (RT)", type: "Assinatura Digital ICP-Brasil", desc: "Segunda assinatura ICP com credencial de RT. Confere validade técnica e legal ao laudo e ao certificado emitido." },
        { level: "ICP 3", name: "Assinatura do Cliente", actor: "Cliente", type: "Assinatura Digital ICP-Brasil", desc: "Assinatura final do cliente confirma ciência e aprovação do resultado da inspeção. Gera documento com validade jurídica." },
      ]},
      { type: "subtitle", text: "9.3 Lógica de Validação e Integridade" },
      { type: "list", items: [
        "Cada assinatura ICP bloqueia edição do documento — qualquer alteração invalida automaticamente a assinatura",
        "Assinaturas são armazenadas com hash do conteúdo assinado (SHA-256)",
        "Timestamp registrado via servidor de tempo confiável (NTP-sincronizado)",
        "Cada signatário recebe confirmação por e-mail com recibo da operação",
        "Trilha de auditoria de assinaturas é imutável e separada do documento",
      ]},
    ]
  },
  traceability: {
    title: "10. Portal de Rastreabilidade",
    body: [
      { type: "paragraph", text: "O Portal de Rastreabilidade é um ambiente seguro e somente leitura criado para atender às demandas de órgãos reguladores como INMETRO e ANTT, bem como auditores internos e externos. Ele expõe a cadeia completa de evidências de uma inspeção de forma estruturada, sem necessidade de acesso ao sistema principal." },
      { type: "subtitle", text: "10.1 Acesso ao Portal" },
      { type: "list", items: [
        "Cada inspeção finalizada gera automaticamente um link único e rastreável",
        "Um QR Code é gerado e pode ser impresso no Certificado de Inspeção ou compartilhado fisicamente",
        "O acesso pode ser público (qualquer um com o link pode verificar autenticidade básica) ou restrito (exige credencial de auditor cadastrado para ver detalhes completos)",
        "O Administrador do sistema define o nível de acesso para cada auditor ou órgão regulador",
        "Logs de acesso ao portal são registrados: quem acessou, quando e quais dados foram consultados"
      ]},
      { type: "subtitle", text: "10.2 Conteúdo Disponível" },
      { type: "table", headers: ["Informação", "Acesso Público (link/QR)", "Acesso Restrito (auditor credenciado)"], rows: [
        ["Número e status do certificado", "✓", "✓"],
        ["Data de emissão e validade", "✓", "✓"],
        ["Nome do objeto inspecionado e cliente", "✓", "✓"],
        ["Hash de integridade dos documentos", "✓", "✓"],
        ["Identidade de signatários ICP-Brasil", "✓", "✓"],
        ["Documentos completos (Relatório Final, Certificado)", "—", "✓"],
        ["Checklist preenchido e evidências fotográficas", "—", "✓"],
        ["Trilha de auditoria completa (todos os eventos)", "—", "✓"],
        ["Logs de validação sistêmica (Coord. e RT)", "—", "✓"],
        ["Histórico de versões e retificações", "—", "✓"],
        ["Dados do inspetor e RT responsáveis", "—", "✓"],
      ]},
      { type: "subtitle", text: "10.3 Segurança e Imutabilidade" },
      { type: "highlight", text: "Os dados exibidos no Portal de Rastreabilidade são somente leitura e derivados de um repositório imutável separado do banco de dados operacional. Qualquer tentativa de adulteração é detectada pela divergência de hash SHA-256 armazenado no momento da publicação." }
    ]
  },
  scenario: {
    title: "11. Cenário de Exemplo Completo",
    body: [
      { type: "paragraph", text: "Cenário realista que demonstra o ciclo completo de uma inspeção, desde a criação da demanda pela Gestora até a publicação no Portal de Rastreabilidade, incluindo rejeição pelo cliente e resubmissão." },
      { type: "scenario", title: "Inspeção de Conformidade Estrutural — Edifício Comercial Torre Alpha", steps: [
        { day: "Dia 1", actor: "Gestora (Carla)", actions: ["Cria a demanda 'INS-2024-0891 — Torre Alpha' no sistema","Preenche todas as informações: cliente Construtora BetaBuild, contrato CT-2024-112, escopo de inspeção estrutural predial, normas aplicáveis (NBR 6118:2014), prazo de 10 dias","Atribui o inspetor Carlos como responsável pelo campo","Sistema notifica o Coordenador Ana sobre o novo projeto atribuído"] },
        { day: "Dia 2", actor: "Coordenador (Ana)", actions: ["Recebe notificação e acessa o projeto no sistema","Seleciona a 'boneca' (template base) 'Inspeção Estrutural Predial'","Personaliza o plano: 4 seções (Fundações, Estrutura, Fachada, Instalações), 42 itens com tipos variados","Configura regra condicional: 'Trinca na estrutura = Sim' dispara obrigatoriedade de foto e laudo","Publica o Plano de Inspeção — inspetor Carlos é notificado"] },
        { day: "Dia 3 — Campo", actor: "Inspetor (Carlos)", actions: ["Abre o app mobile às 7h, carrega a inspeção offline (sem sinal no subsolo)","Preenche 38 de 42 itens, captura 27 fotos e registra 6 coordenadas GPS","No item 'Trinca na estrutura': marca 'Sim' — app exige foto + campo de observação","Sobe ao 15º andar, app detecta sinal e sincroniza automaticamente","Finaliza os 4 itens restantes e submete — estado muda para PENDENTE_VALIDAÇÃO_COORD"] },
        { day: "Dia 4", actor: "Coordenador (Ana)", actions: ["Revisa todos os 42 itens e as 27 fotos","Rejeita com comentário: 'Foto da trinca no pilar P-07 está desfocada. Necessário nova captura'","Estado muda para EM_AJUSTE — Carlos é notificado"] },
        { day: "Dia 5", actor: "Inspetor (Carlos)", actions: ["Retorna ao local, captura nova foto de alta qualidade","Resubmete — estado retorna para PENDENTE_VALIDAÇÃO_COORD"] },
        { day: "Dia 5 (tarde)", actor: "Coordenador (Ana) + RT (Dr. Marcos)", actions: ["Ana aprova — estado avança para PENDENTE_VALIDAÇÃO_RT","Dr. Marcos emite parecer: 'Trinca superficial, sem risco estrutural imediato. Monitoramento semestral'","Dr. Marcos confirma com log sistêmico de RT","Sistema gera Relatório Parcial v1.0"] },
        { day: "Dia 6", actor: "Cliente (BetaBuild)", actions: ["Acessa portal e revisa o relatório parcial","Solicita ajuste: 'Incluir referência à NBR 6118:2014 e prazo máximo para monitoramento'","Estado muda para EM_REVISÃO_CLIENTE"] },
        { day: "Dia 7", actor: "Coordenador (Ana) + RT (Dr. Marcos)", actions: ["Dr. Marcos atualiza o parecer incluindo referência normativa e prazo de 6 meses","Sistema versiona o Relatório Parcial para v2.0","Fluxo reinicia: Coordenador aprova → RT aprova → Relatório v2.0 enviado ao cliente"] },
        { day: "Dia 8", actor: "Cliente (BetaBuild)", actions: ["Aprova a nova versão do relatório","A aprovação dispara automaticamente o fluxo de assinatura ICP-Brasil"] },
        { day: "Dia 8 (assinaturas)", actor: "Coordenador + RT + Cliente", actions: ["Coordenador Ana assina digitalmente via ICP-Brasil","RT Dr. Marcos assina via ICP-Brasil com credencial de RT","Representante da BetaBuild assina via ICP-Brasil","Sistema valida todas as assinaturas → FINALIZADO"] },
        { day: "Dia 8 (automático)", actor: "Sistema", actions: ["Gera Relatório Final v1.0 com todas as assinaturas ICP","Gera Certificado CERT-2024-0891","Publica cadeia de evidências no Portal de Rastreabilidade","Gera QR Code único vinculado ao certificado","Notifica Carla (Gestora) sobre conclusão — métricas de SLA registradas"] },
      ]}
      ,
      { type: "highlight", text: "Resultado: Inspeção INS-2024-0891 concluída em 8 dias. 1 ciclo de rejeição interna + 1 ciclo de rejeição do cliente. 50+ eventos na trilha de auditoria. 2 versões de relatório parcial. Certificado CERT-2024-0891 com 3 assinaturas ICP-Brasil. QR Code publicado no Portal de Rastreabilidade." }
    ]
  }
};

const archSystems = [
  { id: "web", name: "Sistema Web", icon: "🖥️", color: "#4f46e5", desc: "Plataforma principal de gestão, configuração e validação. Utilizada por Gestora, Coordenador, RT e Inspetor.",
    modules: [
      { id: "gestao", name: "Gestão de Projetos", color: "#4f46e5", actor: "Gestora", pages: [
        { name: "Dashboard Geral", items: ["Visão geral de todas as inspeções","Filtros por status, inspetor, prazo, projeto","Alertas de SLA e pendências","Métricas de desempenho em tempo real"] },
        { name: "Projetos", items: ["Lista de projetos","Criar novo projeto","Detalhes do projeto (contrato, escopo, normas)","Upload e gestão de contrato","Atribuição de inspetor","Histórico de atividades","Configurar alertas e prazos"] },
        { name: "Demandas de Inspeção", items: ["Criar nova demanda","Lista de demandas","Detalhes da demanda","Acompanhar status em tempo real","Cancelar demanda"] },
        { name: "Relatórios Gerenciais", items: ["Exportar relatórios por período","Métricas de SLA","Histórico de inspeções finalizadas"] },
      ]},
      { id: "coord", name: "Coordenação de Inspeção", color: "#7c3aed", actor: "Coordenador", pages: [
        { name: "Meus Projetos", items: ["Lista de projetos atribuídos","Notificações de novos projetos","Status de cada inspeção sob gestão"] },
        { name: "Plano de Inspeção", items: ["Criar plano (a partir de boneca/template)","Selecionar boneca base","Personalizar seções e itens","Tipos de resposta (foto, número, seleção, GPS)","Configurar campos obrigatórios","Regras condicionais","Publicar plano"] },
        { name: "Biblioteca de Bonecas", items: ["Lista de templates disponíveis","Criar nova boneca","Editar boneca existente","Versionar boneca","Clonar boneca"] },
        { name: "Validação Técnica", items: ["Fila de inspeções para revisar","Revisor de checklist preenchido","Visualizador de evidências (fotos, GPS)","Aprovar inspeção","Rejeitar com comentário","Solicitar complementação"] },
        { name: "Minha Rede de Inspetores", items: ["Lista de inspetores vinculados","Histórico de inspeções por inspetor","Desempenho e SLAs da rede"] },
      ]},
      { id: "rt", name: "Responsável Técnico", color: "#1d4ed8", actor: "RT", pages: [
        { name: "Fila de Validação RT", items: ["Inspeções aprovadas pelo coordenador aguardando RT","Filtros por tipo, projeto e urgência"] },
        { name: "Revisão Técnica", items: ["Visualizar checklist completo","Visualizar evidências","Histórico de versões","Emitir parecer técnico","Aprovar com log sistêmico","Rejeitar com justificativa"] },
        { name: "Histórico de Laudos", items: ["Todas as inspeções validadas pelo RT","Busca por data, projeto ou inspetor","Download de pareceres emitidos"] },
      ]},
      { id: "inspetor_web", name: "Área do Inspetor (Web)", color: "#059669", actor: "Inspetor", pages: [
        { name: "Minhas Inspeções", items: ["Lista de inspeções atribuídas","Status de cada inspeção","Filtrar por prazo e projeto"] },
        { name: "Executar Inspeção", items: ["Formulário dinâmico do checklist","Captura de fotos e vídeos","GPS manual ou automático","Salvar rascunho","Submeter inspeção concluída"] },
        { name: "Histórico", items: ["Inspeções concluídas","Feedbacks e rejeições recebidas","Histórico de complementações"] },
      ]},
    ]
  },
  { id: "mobile", name: "App Mobile", icon: "📱", color: "#059669", desc: "Aplicativo iOS/Android para execução de inspeções em campo. Opera 100% offline com sincronização inteligente.",
    modules: [
      { id: "mobile_main", name: "App do Inspetor", color: "#059669", actor: "Inspetor", pages: [
        { name: "Tela Inicial", items: ["Status de conectividade (offline/online)","Inspeções do dia","Pendências de sincronização","Notificações push"] },
        { name: "Inspeções", items: ["Lista de inspeções baixadas offline","Download de nova inspeção","Status de sincronização por inspeção"] },
        { name: "Executar Inspeção (Offline)", items: ["Checklist paginado com progresso visual","Tipos: texto, número, seleção, foto, GPS","Câmera integrada sem sair do checklist","GPS automático por item","Auto-save a cada resposta","Indicador de itens obrigatórios pendentes","Submeter ao recuperar conexão"] },
        { name: "Sincronização", items: ["Fila de operações pendentes","Upload incremental de mídias","Resolução de conflitos com feedback","Histórico de sincronizações"] },
      ]},
    ]
  },
  { id: "portal_cliente", name: "Portal do Cliente", icon: "🏢", color: "#b45309", desc: "Interface simplificada para o cliente externo revisar, aprovar ou solicitar ajustes em relatórios de inspeção.",
    modules: [
      { id: "cliente_main", name: "Portal do Cliente", color: "#b45309", actor: "Cliente", pages: [
        { name: "Acesso", items: ["Login via link único por inspeção","Verificação de identidade simples"] },
        { name: "Relatório Parcial", items: ["Visualização completa do relatório","Galeria de evidências fotográficas","Parecer técnico do RT","Histórico de versões do relatório"] },
        { name: "Aprovação / Rejeição", items: ["Botão de aprovação em destaque","Confirmação dupla antes de aprovar","Rejeitar com campo de comentários estruturado","Histórico de interações do cliente"] },
        { name: "Assinatura ICP-Brasil", items: ["Fluxo de assinatura digital ICP-Brasil","Confirmação de identidade para assinatura","Recibo da operação por e-mail"] },
        { name: "Documentos Finais", items: ["Download do Relatório Final","Download do Certificado de Inspeção","QR Code do Portal de Rastreabilidade"] },
      ]},
    ]
  },
  { id: "portal_rastreabilidade", name: "Portal de Rastreabilidade", icon: "🔎", color: "#0369a1", desc: "Ambiente somente leitura para auditores do INMETRO, ANTT e órgãos reguladores acessarem a cadeia de evidências.",
    modules: [
      { id: "rastrear_publico", name: "Acesso Público", color: "#0369a1", actor: "Qualquer pessoa com link/QR", pages: [
        { name: "Verificação de Certificado", items: ["Número e status do certificado","Data de emissão e validade","Nome do objeto inspecionado","Hash de integridade (SHA-256)","Identidade dos signatários ICP-Brasil","Verificação de autenticidade em tempo real"] },
      ]},
      { id: "rastrear_auditor", name: "Acesso Auditor Credenciado", color: "#0284c7", actor: "Auditor / INMETRO / ANTT", pages: [
        { name: "Busca e Filtros", items: ["Busca por número de certificado","Filtro por CNPJ do cliente","Filtro por período, inspetor ou projeto","Filtro por tipo de inspeção e norma"] },
        { name: "Cadeia de Evidências", items: ["Linha do tempo completa da inspeção","Todos os eventos registrados","Logs de validação sistêmica","Assinaturas ICP-Brasil com verificação online"] },
        { name: "Documentos Completos", items: ["Relatório Final completo","Certificado de Inspeção","Checklist preenchido com evidências","Histórico de versões e retificações","Pareceres técnicos do RT"] },
        { name: "Exportação", items: ["Relatório de auditoria em PDF","Exportação estruturada (JSON/XML)","Comparação de versões de documentos"] },
        { name: "Painel Regulatório", items: ["Métricas agregadas de conformidade","Inspeções por período e região","Alertas de não-conformidades recorrentes"] },
      ]},
    ]
  },
  { id: "admin_system", name: "Administração do Sistema", icon: "⚙️", color: "#db2777", desc: "Painel administrativo para gestão de todos os usuários, permissões, entidades e configurações globais da plataforma.",
    modules: [
      { id: "admin_main", name: "Painel Administrativo", color: "#db2777", actor: "Administrador", pages: [
        { name: "Usuários", items: ["Listar todos os usuários","Cadastrar novo usuário","Editar perfil e permissões","Ativar / Inativar usuário","Definir papel: Gestora, Coordenador, RT, Inspetor, Auditor","Vincular inspetor a coordenador","Redefinir senha"] },
        { name: "Inspetores", items: ["Cadastro: CREA/CAU, especialidades, localização","Disponibilidade e agenda","Histórico de inspeções realizadas","Indicadores de desempenho"] },
        { name: "Coordenadores", items: ["Área de atuação","Rede de inspetores sob gestão","Histórico de projetos coordenados"] },
        { name: "Responsáveis Técnicos", items: ["Registro profissional e especialidade","Validade do registro","Projetos vinculados","Renovação de credencial"] },
        { name: "Clientes", items: ["Cadastro de clientes (CNPJ, contato, endereço)","Histórico de inspeções do cliente","Acessos ao portal do cliente"] },
        { name: "Auditores Externos", items: ["Cadastro de auditores e órgãos","Definir nível de acesso","Emitir credencial de acesso","Escopo de consulta","Logs de acesso ao portal"] },
        { name: "Configurações Globais", items: ["Parâmetros de SLA por tipo de inspeção","Templates de notificação (e-mail, push)","Regras de versionamento de documentos","Configurações de integração ICP-Brasil","Backup e retenção de dados"] },
      ]},
    ]
  },
];

function Badge({ text, color }) {
  return (
    <span style={{ background: color + "18", color, border: `1px solid ${color}40`, borderRadius: 4, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>
      {text}
    </span>
  );
}

function ArchInteractive() {
  const [selSystem, setSelSystem] = useState(null);
  const [selModule, setSelModule] = useState(null);
  const [selPage, setSelPage] = useState(null);

  const sys = archSystems.find(s => s.id === selSystem);
  const mod = sys?.modules.find(m => m.id === selModule);
  const page = mod?.pages.find(p => p.name === selPage);

  const reset = () => { setSelSystem(null); setSelModule(null); setSelPage(null); };
  const pickSys = (id) => { setSelSystem(id); setSelModule(null); setSelPage(null); };
  const pickMod = (id) => { setSelModule(id); setSelPage(null); };

  const btnBase = { background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 14, fontWeight: 600 };

  return (
    <div style={{ margin: "8px 0" }}>
      {selSystem && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          <button onClick={reset} style={{ ...btnBase, color: T.accent }}>← Todos os Sistemas</button>
          {selModule && <><span style={{ color: T.textMuted }}>/</span><button onClick={() => { setSelModule(null); setSelPage(null); }} style={{ ...btnBase, color: T.accent }}>{sys?.name}</button></>}
          {selPage && <><span style={{ color: T.textMuted }}>/</span><button onClick={() => setSelPage(null)} style={{ ...btnBase, color: T.accent }}>{mod?.name}</button><span style={{ color: T.textMuted }}>/</span><span style={{ color: T.textSub, fontSize: 14 }}>{selPage}</span></>}
        </div>
      )}

      {!selSystem && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {archSystems.map(s => (
            <button key={s.id} onClick={() => pickSys(s.id)} style={{ background: T.card, border: `2px solid ${s.color}30`, borderRadius: 12, padding: "18px 16px", textAlign: "left", cursor: "pointer", transition: "all 0.15s", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.boxShadow = `0 4px 16px ${s.color}20`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = s.color + "30"; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"; }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 24 }}>{s.icon}</span>
                <span style={{ color: s.color, fontWeight: 800, fontSize: 15 }}>{s.name}</span>
              </div>
              <p style={{ color: T.textSub, fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>{s.desc}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                {s.modules.map(m => <span key={m.id} style={{ background: s.color + "12", color: s.color, fontSize: 11, padding: "3px 8px", borderRadius: 4, border: `1px solid ${s.color}25`, fontWeight: 600 }}>{m.name}</span>)}
              </div>
              <div style={{ fontSize: 12, color: s.color, fontWeight: 600 }}>Explorar sistema →</div>
            </button>
          ))}
        </div>
      )}

      {selSystem && !selModule && sys && (
        <div>
          <div style={{ background: sys.color + "10", border: `1.5px solid ${sys.color}30`, borderRadius: 10, padding: "14px 16px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>{sys.icon}</span>
            <div>
              <div style={{ color: sys.color, fontWeight: 800, fontSize: 17 }}>{sys.name}</div>
              <div style={{ color: T.textSub, fontSize: 13, marginTop: 3 }}>{sys.desc}</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {sys.modules.map(m => (
              <button key={m.id} onClick={() => pickMod(m.id)} style={{ background: T.card, border: `2px solid ${m.color}25`, borderRadius: 10, padding: "14px 16px", textAlign: "left", cursor: "pointer", transition: "all 0.15s", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = m.color; e.currentTarget.style.boxShadow = `0 4px 12px ${m.color}20`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = m.color + "25"; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)"; }}>
                <div style={{ color: m.color, fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{m.name}</div>
                <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 12 }}>Ator: <span style={{ color: T.textSub, fontWeight: 600 }}>{m.actor}</span></div>
                {m.pages.map(p => (
                  <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: m.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: T.textSub }}>{p.name}</span>
                  </div>
                ))}
                <div style={{ fontSize: 12, color: m.color, fontWeight: 600, marginTop: 10 }}>Ver detalhes →</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {selModule && !selPage && mod && (
        <div>
          <div style={{ background: mod.color + "10", border: `1.5px solid ${mod.color}30`, borderRadius: 10, padding: "14px 16px", marginBottom: 20 }}>
            <div style={{ color: mod.color, fontWeight: 800, fontSize: 16 }}>{mod.name}</div>
            <div style={{ color: T.textSub, fontSize: 13, marginTop: 3 }}>Ator principal: <span style={{ fontWeight: 600 }}>{mod.actor}</span></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {mod.pages.map(p => (
              <button key={p.name} onClick={() => setSelPage(p.name)} style={{ background: T.card, border: `2px solid ${mod.color}25`, borderRadius: 10, padding: "14px 16px", textAlign: "left", cursor: "pointer", transition: "all 0.15s", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = mod.color; e.currentTarget.style.boxShadow = `0 4px 12px ${mod.color}20`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = mod.color + "25"; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: mod.color + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, background: mod.color }} />
                  </div>
                  <span style={{ color: T.text, fontWeight: 700, fontSize: 14 }}>{p.name}</span>
                </div>
                <div style={{ fontSize: 13, color: T.textMuted }}>{p.items.length} funcionalidades</div>
                <div style={{ fontSize: 12, color: mod.color, fontWeight: 600, marginTop: 8 }}>Ver sitemap →</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {selPage && page && mod && (
        <div>
          <div style={{ background: mod.color + "10", border: `1.5px solid ${mod.color}30`, borderRadius: 10, padding: "14px 16px", marginBottom: 20 }}>
            <div style={{ color: mod.color, fontWeight: 800, fontSize: 16 }}>{selPage}</div>
            <div style={{ color: T.textSub, fontSize: 13, marginTop: 3 }}>Módulo: {mod.name} · Ator: {mod.actor}</div>
          </div>
          <div style={{ background: T.card, border: `1.5px solid ${mod.color}25`, borderRadius: 10, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: 12, color: T.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Funcionalidades desta tela</div>
            {page.items.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 26, height: 26, borderRadius: 6, background: mod.color + "15", border: `1px solid ${mod.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: mod.color }}>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <span style={{ color: T.text, fontSize: 14, lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {mod.pages.filter(p => p.name !== selPage).map(p => (
              <button key={p.name} onClick={() => setSelPage(p.name)} style={{ background: T.card, border: `1.5px solid ${mod.color}25`, borderRadius: 6, padding: "7px 14px", fontSize: 13, color: T.textSub, cursor: "pointer", fontWeight: 500, transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = mod.color; e.currentTarget.style.color = mod.color; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = mod.color + "25"; e.currentTarget.style.color = T.textSub; }}>
                {p.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function OrgChart() {
  return (
    <div style={{ overflowX: "auto", margin: "16px 0" }}>
      <svg viewBox="0 0 520 230" style={{ width: "100%", maxWidth: 520 }}>
        <rect x={180} y={10} width={160} height={42} rx={8} fill="#db277715" stroke="#db277750" strokeWidth="1.5"/>
        <text x={260} y={35} textAnchor="middle" fontSize="13" fontWeight="700" fill="#db2777">Administrador</text>
        <line x1={260} y1={52} x2={260} y2={68} stroke="#cbd5e1" strokeWidth="1.5"/>
        <line x1={65} y1={68} x2={455} y2={68} stroke="#cbd5e1" strokeWidth="1.5"/>
        {[65, 195, 325, 455].map((x, i) => <line key={i} x1={x} y1={68} x2={x} y2={82} stroke="#cbd5e1" strokeWidth="1.5"/>)}
        {[
          { x: 5, label: "Gestora de\nProjetos", color: "#4f46e5" },
          { x: 135, label: "Coordenador\nde Inspeção", color: "#7c3aed" },
          { x: 265, label: "Responsável\nTécnico", color: "#1d4ed8" },
          { x: 395, label: "Auditor /\nÓrgão Reg.", color: "#0369a1" },
        ].map((r, i) => (
          <g key={i}>
            <rect x={r.x} y={82} width={120} height={48} rx={8} fill={r.color + "12"} stroke={r.color + "50"} strokeWidth="1.5"/>
            {r.label.split("\n").map((t, j) => <text key={j} x={r.x + 60} y={102 + j * 16} textAnchor="middle" fontSize="12" fontWeight="600" fill={r.color}>{t}</text>)}
          </g>
        ))}
        <line x1={195} y1={130} x2={195} y2={148} stroke="#cbd5e1" strokeWidth="1.5"/>
        <rect x={135} y={148} width={120} height={42} rx={8} fill="#05996912" stroke="#05996950" strokeWidth="1.5"/>
        <text x={195} y={173} textAnchor="middle" fontSize="12" fontWeight="600" fill="#059669">Inspetor</text>
        <line x1={65} y1={130} x2={65} y2={148} stroke="#cbd5e1" strokeWidth="1.5"/>
        <rect x={5} y={148} width={120} height={42} rx={8} fill="#b4530912" stroke="#b4530950" strokeWidth="1.5"/>
        <text x={65} y={173} textAnchor="middle" fontSize="12" fontWeight="600" fill="#b45309">Cliente</text>
        <text x={260} y={218} textAnchor="middle" fontSize="11" fill="#94a3b8">Hierarquia operacional do sistema</text>
      </svg>
    </div>
  );
}

function renderContent(section) {
  const data = content[section];
  if (!data) return null;
  return (
    <div>
      {data.body.map((block, i) => {
        if (block.type === "arch_interactive") return <ArchInteractive key={i} />;
        if (block.type === "org_chart") return <OrgChart key={i} />;
        if (block.type === "paragraph") return (
          <p key={i} style={{ color: T.textSub, lineHeight: 1.8, marginBottom: 18, fontSize: 15 }}>{block.text}</p>
        );
        if (block.type === "subtitle") return (
          <h3 key={i} style={{ color: T.text, fontSize: 16, fontWeight: 700, marginTop: 28, marginBottom: 12, borderLeft: `3px solid ${T.accent}`, paddingLeft: 12 }}>{block.text}</h3>
        );
        if (block.type === "highlight") return (
          <div key={i} style={{ background: T.highlight, border: `1px solid ${T.highlightBorder}`, borderRadius: 8, padding: 18, margin: "18px 0", color: T.highlightText, fontSize: 14, lineHeight: 1.8 }}>{block.text}</div>
        );
        if (block.type === "metrics") return (
          <div key={i} style={{ display: "flex", gap: 14, flexWrap: "wrap", margin: "24px 0" }}>
            {block.items.map((m, j) => (
              <div key={j} style={{ background: T.card, border: `1.5px solid ${T.cardBorder}`, borderRadius: 10, padding: "18px 28px", textAlign: "center", minWidth: 130, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: T.accent }}>{m.value}</div>
                <div style={{ fontSize: 13, color: T.textMuted, marginTop: 4 }}>{m.label}</div>
              </div>
            ))}
          </div>
        );
        if (block.type === "list") return (
          <ul key={i} style={{ margin: "14px 0", paddingLeft: 22 }}>
            {block.items.map((item, j) => (
              <li key={j} style={{ color: T.textSub, marginBottom: 10, lineHeight: 1.7, fontSize: 14 }}>{item}</li>
            ))}
          </ul>
        );
        if (block.type === "table") return (
          <div key={i} style={{ overflowX: "auto", margin: "18px 0", borderRadius: 8, border: `1px solid ${T.cardBorder}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr>{block.headers.map((h, j) => <th key={j} style={{ background: T.tableHead, color: T.tableHeadText, padding: "12px 16px", textAlign: "left", borderBottom: `1px solid ${T.cardBorder}`, fontWeight: 700, fontSize: 13 }}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {block.rows.map((row, j) => (
                  <tr key={j} style={{ borderBottom: `1px solid ${T.rowBorder}`, background: j % 2 === 0 ? "#ffffff" : "#fafafa" }}>
                    {row.map((cell, k) => <td key={k} style={{ padding: "12px 16px", color: k === 0 ? T.text : T.textSub, fontSize: 14, fontWeight: k === 0 ? 600 : 400 }}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        if (block.type === "flow") return (
          <div key={i} style={{ margin: "16px 0" }}>
            {block.steps.map((step, j) => (
              <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: T.accentLight, color: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0, marginTop: 2 }}>{j + 1}</div>
                <div style={{ color: T.textSub, fontSize: 14, lineHeight: 1.7 }}>{step}</div>
              </div>
            ))}
          </div>
        );
        if (block.type === "workflow") return (
          <div key={i} style={{ margin: "16px 0" }}>
            {block.steps.map((step, j) => (
              <div key={j} style={{ display: "flex", gap: 0, marginBottom: 6, alignItems: "stretch" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 14 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: T.accentLight, color: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{step.num}</div>
                  {j < block.steps.length - 1 && <div style={{ width: 2, flex: 1, background: T.cardBorder, minHeight: 12 }} />}
                </div>
                <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 8, padding: "12px 16px", marginBottom: 4, flex: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 13, color: T.accent, fontWeight: 700 }}>{step.actor}</span>
                    <span style={{ fontSize: 13, color: T.text, fontWeight: 600 }}>{step.action}</span>
                    <Badge text={step.state} color={T.accent} />
                  </div>
                  <div style={{ fontSize: 13, color: T.textMuted }}>{step.detail}</div>
                </div>
              </div>
            ))}
          </div>
        );
        if (block.type === "rejection") return (
          <div key={i} style={{ margin: "16px 0" }}>
            {block.steps.map((step, j) => (
              <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                <Badge text={step.from} color="#dc2626" />
                <span style={{ color: T.textMuted, fontSize: 14 }}>→</span>
                <span style={{ color: T.textSub, fontSize: 14 }}>{step.action}</span>
                <span style={{ color: T.textMuted, fontSize: 14 }}>→</span>
                <Badge text={step.to} color="#b45309" />
              </div>
            ))}
          </div>
        );
        if (block.type === "roles") return (
          <div key={i} style={{ margin: "16px 0" }}>
            {block.items.map((role, j) => (
              <div key={j} style={{ background: T.card, border: `1.5px solid ${role.color}25`, borderRadius: 10, padding: 18, marginBottom: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 26 }}>{role.icon}</span>
                  <span style={{ color: role.color, fontWeight: 800, fontSize: 16 }}>{role.role}</span>
                  <div style={{ display: "flex", gap: 4 }}>{role.platforms.map((p, k) => <Badge key={k} text={p} color={role.color} />)}</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <div style={{ fontSize: 12, color: T.textMuted, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Permissões</div>
                    {role.permissions.map((p, k) => <div key={k} style={{ fontSize: 13, color: T.textSub, marginBottom: 6, paddingLeft: 10, borderLeft: `2px solid ${role.color}40`, lineHeight: 1.5 }}>{p}</div>)}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: T.textMuted, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Restrições</div>
                    {role.restrictions.map((r, k) => <div key={k} style={{ fontSize: 13, color: "#dc2626", marginBottom: 6, paddingLeft: 10, borderLeft: "2px solid #fca5a5", lineHeight: 1.5 }}>{r}</div>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
        if (block.type === "states") return (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "16px 0" }}>
            {block.items.map((state, j) => (
              <div key={j} style={{ background: T.card, border: `1.5px solid ${state.color}25`, borderRadius: 8, padding: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: state.color, flexShrink: 0 }} />
                  <span style={{ color: state.color, fontWeight: 700, fontSize: 13 }}>{state.label}</span>
                </div>
                <p style={{ color: T.textSub, fontSize: 13, marginBottom: 8, lineHeight: 1.6 }}>{state.desc}</p>
                {state.triggers.map((t, k) => <div key={k} style={{ fontSize: 12, color: T.textMuted, fontStyle: "italic" }}>→ {t}</div>)}
              </div>
            ))}
          </div>
        );
        if (block.type === "signature_levels") return (
          <div key={i} style={{ margin: "16px 0" }}>
            {block.items.map((sig, j) => (
              <div key={j} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: T.accentLight, color: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0, textAlign: "center" }}>{sig.level}</div>
                <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 8, padding: 14, flex: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                    <span style={{ color: T.text, fontWeight: 700, fontSize: 14 }}>{sig.name}</span>
                    <Badge text={sig.actor} color={T.accent} />
                    <Badge text={sig.type} color="#059669" />
                  </div>
                  <p style={{ color: T.textSub, fontSize: 13, lineHeight: 1.6 }}>{sig.desc}</p>
                </div>
              </div>
            ))}
          </div>
        );
        if (block.type === "scenario") return (
          <div key={i} style={{ margin: "16px 0" }}>
            <div style={{ background: T.highlight, border: `1px solid ${T.highlightBorder}`, borderRadius: 8, padding: 14, marginBottom: 20, color: T.highlightText, fontWeight: 700, fontSize: 15 }}>📋 {block.title}</div>
            {block.steps.map((step, j) => (
              <div key={j} style={{ display: "flex", gap: 14, marginBottom: 14 }}>
                <div style={{ minWidth: 90, textAlign: "right", paddingTop: 2 }}>
                  <Badge text={step.day} color={T.accent} />
                  <div style={{ marginTop: 5, fontSize: 12, color: T.accent, fontWeight: 600 }}>{step.actor.split(" ")[0]}</div>
                </div>
                <div style={{ borderLeft: `2px solid ${T.cardBorder}`, paddingLeft: 14, flex: 1 }}>
                  <div style={{ fontSize: 14, color: T.text, fontWeight: 700, marginBottom: 6 }}>{step.actor}</div>
                  {step.actions.map((a, k) => (
                    <div key={k} style={{ fontSize: 13, color: T.textSub, marginBottom: 5, paddingLeft: 10, borderLeft: `2px solid ${T.cardBorder}`, lineHeight: 1.6 }}>• {a}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        return null;
      })}
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("summary");

  return (
    <div style={{ display: "flex", height: "100vh", background: T.bg, fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: T.text, overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{ width: 280, flexShrink: 0, background: T.sidebar, borderRight: `1px solid ${T.sidebarBorder}`, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px 20px 16px", borderBottom: `1px solid ${T.sidebarBorder}` }}>
          <div style={{ fontSize: 11, color: T.accent, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>Documentação Técnica</div>
          <div style={{ fontSize: 15, color: T.text, fontWeight: 800, lineHeight: 1.4 }}>Sistema de Gestão de Inspeções</div>
          <div style={{ fontSize: 12, color: T.textMuted, marginTop: 4 }}>Arquitetura de Produto v2.0</div>
        </div>
        <nav style={{ padding: "10px 0", flex: 1 }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)} style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "11px 20px", fontSize: 13, fontWeight: active === s.id ? 700 : 500,
              color: active === s.id ? T.accent : T.textSub,
              background: active === s.id ? T.accentLight : "transparent",
              border: "none", borderLeft: active === s.id ? `3px solid ${T.accent}` : "3px solid transparent",
              cursor: "pointer", lineHeight: 1.5, transition: "all 0.15s"
            }}>
              {s.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: 16, borderTop: `1px solid ${T.sidebarBorder}` }}>
          <div style={{ fontSize: 11, color: T.textMuted, textAlign: "center" }}>Gerado por Claude · 2025</div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "36px 48px" }}>
        <h2 style={{ color: T.text, fontSize: 24, fontWeight: 800, marginBottom: 28, paddingBottom: 18, borderBottom: `1px solid ${T.cardBorder}` }}>
          {content[active]?.title}
        </h2>
        {renderContent(active)}
      </div>
    </div>
  );
}
