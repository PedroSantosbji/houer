import { useState } from "react";

const sections = [
  { id: "summary", label: "1. Resumo Executivo" },
  { id: "overview", label: "2. Visão Geral do Sistema" },
  { id: "layers", label: "3. Camadas de Arquitetura" },
  { id: "admin", label: "4. Administração de Entidades" },
  { id: "roles", label: "5. Papéis e Responsabilidades" },
  { id: "workflow", label: "6. Fluxo End-to-End" },
  { id: "documents", label: "7. Documentos e Formulários" },
  { id: "codification", label: "8. Codificação de Documentos" },
  { id: "statemachine", label: "9. Máquina de Estados" },
  { id: "doclifecycle", label: "10. Ciclo de Vida de Documentos" },
  { id: "signatures", label: "11. Arquitetura de Assinaturas" },
  { id: "traceability", label: "12. Portal de Rastreabilidade" },
  { id: "scenario", label: "13. Cenário de Exemplo" },
];

const T = {
  bg: "#f8fafc", sidebar: "#ffffff", sidebarBorder: "#e2e8f0",
  card: "#ffffff", cardBorder: "#e2e8f0", text: "#0f172a",
  textSub: "#475569", textMuted: "#94a3b8",
  highlight: "#eef2ff", highlightBorder: "#c7d2fe", highlightText: "#3730a3",
  accent: "#4f46e5", accentLight: "#eef2ff",
  tableHead: "#f1f5f9", tableHeadText: "#475569", rowBorder: "#f1f5f9",
  green: "#059669", greenLight: "#ecfdf5",
  orange: "#b45309", orangeLight: "#fffbeb",
  red: "#dc2626", redLight: "#fef2f2",
};

const content = {
  summary: {
    title: "1. Resumo Executivo",
    body: [
      { type: "paragraph", text: "O Sistema de Gestão de Inspeções é uma plataforma enterprise multicanal aderente ao PQ-08, ISO 17020 e aos procedimentos PQ-12, PQ-13 e PQ-14. Orquestra fluxos completos de inspeção técnica — desde a análise crítica de contratos até a emissão de certificados digitais com validade jurídica — garantindo rastreabilidade formal de todos os artefatos gerados." },
      { type: "highlight", text: "Mudança central de mentalidade: no modelo atual, o código identifica o documento. No sistema, Código + Status + Versão = vida do documento. Toda codificação é automática, todo versionamento é imutável, toda evidência é rastreável." },
      { type: "metrics", items: [
        { label: "Plataformas", value: "4" },
        { label: "Papéis de usuário", value: "6" },
        { label: "Formulários (FORs)", value: "10+" },
        { label: "Tipos de inspeção", value: "3" },
      ]},
      { type: "subtitle", text: "Tipos de Inspeção Suportados" },
      { type: "table", headers: ["Tipo", "Checklist", "Rel. Visita", "Rel. Parcial", "Não Conformidade", "Rel. Final", "Certificado"], rows: [
        ["Projeto (PQ-12)", "✓ FOR-032", "—", "✓ FOR-028", "✓ FOR-029", "✓ FOR-030", "✓ FOR-031"],
        ["Obra (PQ-13)", "✓ FOR-032", "✓ FOR-027", "✓ FOR-028", "✓ FOR-029", "✓ FOR-030", "✓ FOR-031"],
        ["Operação (PQ-14)", "✓ FOR-032", "✓ FOR-027", "✓ FOR-028", "✓ FOR-029", "✓ FOR-030", "✓ FOR-031"],
      ]},
    ],
  },
  overview: {
    title: "2. Visão Geral do Sistema",
    body: [
      { type: "subtitle", text: "2.1 Plataformas" },
      { type: "table", headers: ["Plataforma", "Usuários", "Função Principal"], rows: [
        ["Web Responsivo", "Gestora, Coordenador, RT, Inspetor", "Configuração, controle de fluxo, validação e monitoramento"],
        ["Mobile App (iOS/Android)", "Inspetor", "Execução de inspeções offline, preenchimento de checklists, sincronização"],
        ["Portal do Cliente", "Cliente externo", "Revisão do Plano de Inspeção, resposta ao RN e aprovação de relatórios"],
        ["Portal de Rastreabilidade", "Auditores, INMETRO, ANTT", "Acesso à cadeia de evidências via link seguro ou QR Code"],
      ]},
      { type: "subtitle", text: "2.2 Interações Principais" },
      { type: "flow", steps: [
        "Gestora cria a demanda: armazena documentação contratual completa (Carta convite, OS, Contrato, Proposta Técnica/Comercial, Edital, PER) e solicita emissão de ART pelos inspetores",
        "Sistema gera automaticamente FOR-022 C (Análise Crítica de Contratos) e FOR-022 D (Análise de Completeza da Documentação) para preenchimento",
        "Coordenador recebe notificação, cria o Plano de Inspeção (FOR-023) a partir de uma boneca e define os inspetores por especialidade",
        "Inspetores executam de forma concomitante, cada um na sua especialidade, preenchendo FOR-032 e gerando evidências",
        "Não conformidades identificadas geram FOR-029 automaticamente, vinculado ao item do checklist",
        "Coordenador e RT validam — FOR-028 (Relatório Parcial) é gerado consolidando todas as especialidades",
        "Cliente recebe o Plano de Inspeção para revisar/aprovar e o FOR-029 para responder com tratativas",
        "Após aprovação do cliente, assinaturas ICP-Brasil são coletadas e sistema gera FOR-030 (Relatório Final) e FOR-031 (Certificado)",
        "Cadeia de evidências publicada no Portal de Rastreabilidade com QR Code",
      ]},
      { type: "subtitle", text: "2.3 O que muda entre os tipos de inspeção" },
      { type: "highlight", text: "O fluxo é sempre o mesmo. O que muda entre Projeto, Obra e Operação é o tipo de evidência coletada: Projeto gera memoriais e desenhos técnicos; Obra gera registros fotográficos de campo e medições; Operação gera avaliação de indicadores e desempenho. O sistema adapta automaticamente os campos do checklist conforme o tipo de inspeção selecionado." },
      { type: "subtitle", text: "2.4 Princípios de Design" },
      { type: "list", items: [
        "Codificação automática: o sistema gera o código do documento — o usuário nunca digita",
        "Versionamento obrigatório e imutável: nenhuma versão é sobrescrita, sempre cria nova",
        "Cadeia documental vinculada: FOR-032 → FOR-027 → FOR-028 → FOR-030 → FOR-031",
        "Não conformidade rastreada: FOR-029 sempre vinculado ao item do checklist que originou",
        "Offline-first: o inspetor nunca é bloqueado por falta de conectividade",
        "Execução concomitante: múltiplos inspetores podem atuar em paralelo por especialidade",
        "Código + Status + Versão = vida completa do documento",
      ]},
    ],
  },
  layers: { title: "3. Camadas de Arquitetura", body: [{ type: "arch_interactive" }] },
  admin: {
    title: "4. Administração de Entidades",
    body: [
      { type: "paragraph", text: "O módulo de Administração centraliza o gerenciamento de todos os atores e entidades do sistema, incluindo o repositório de documentação contratual de cada projeto." },
      { type: "subtitle", text: "4.1 Gestão de Usuários" },
      { type: "table", headers: ["Entidade", "Campos Principais", "Ações Disponíveis"], rows: [
        ["Inspetor", "Nome, CREA/CAU, especialidades, ART vigente, localização", "Cadastrar, editar, ativar/inativar, vincular a coordenador, controlar ART"],
        ["Coordenador", "Nome, credenciais, área de atuação, rede de inspetores", "Cadastrar, editar, definir rede de inspetores"],
        ["Responsável Técnico (RT)", "Nome, registro profissional, especialidade, validade", "Cadastrar, editar, validar registro"],
        ["Gestor de Projetos / Contratos", "Nome, permissões, projetos sob responsabilidade", "Cadastrar, editar, definir escopo de acesso"],
        ["Auditor Externo", "Nome, órgão, credenciais, nível de acesso", "Cadastrar, emitir credencial, definir escopo de consulta"],
      ]},
      { type: "subtitle", text: "4.2 Gestão de Projetos" },
      { type: "paragraph", text: "Ao criar um projeto, o sistema solicita o upload de toda a documentação contratual e de apoio. Essa documentação fica vinculada ao projeto e é referenciada em todos os documentos gerados." },
      { type: "list", items: [
        "Carta convite",
        "Termo de referência",
        "Ordem de Serviço (OS) — base para geração automática do código dos documentos",
        "Contrato assinado",
        "Proposta Técnica e Comercial",
        "Edital (quando aplicável)",
        "PER e outros documentos de apoio",
        "ART dos inspetores designados (sistema solicita e controla validade)",
        "Tipo de inspeção: Projeto (PQ-12), Obra (PQ-13) ou Operação (PQ-14)",
      ]},
      { type: "subtitle", text: "4.3 Estrutura Hierárquica" },
      { type: "org_chart" },
    ],
  },
  roles: {
    title: "5. Papéis e Responsabilidades",
    body: [
      { type: "roles", items: [
        { role: "Gestora de Projetos / Gestora de Contratos", icon: "👩‍💼", color: "#4f46e5", platforms: ["Web"],
          permissions: [
            "Criar plano de inspeção junto ao Coordenador",
            "Criar e gerenciar demandas com informações completas",
            "Armazenar documentação contratual completa no projeto",
            "Vincular contrato, OS, escopo técnico e cliente ao projeto",
            "Solicitar emissão de ART pelos inspetores designados",
            "Designar múltiplos inspetores por especialidade",
            "Monitorar progresso e SLAs em tempo real",
            "Visualizar dashboards de desempenho e gerar relatórios gerenciais",
            "Solicitar complementações a inspetor(es) específico(s)",
          ],
          restrictions: ["Não executa validações técnicas"] },
        { role: "Coordenador de Inspeção", icon: "🗂️", color: "#7c3aed", platforms: ["Web"],
          permissions: [
            "Receber notificação de projeto e criar Plano de Inspeção (FOR-023) a partir de boneca",
            "Preencher e assinar FOR-022 D (Análise de Completeza da Documentação)",
            "Personalizar checklist (FOR-032) por especialidade",
            "Definir inspetores e modo de execução (concomitante ou sequencial)",
            "Validar checklists, evidências e relatórios de todos os inspetores",
            "Aprovar ou rejeitar para inspetor específico",
            "Assinar FOR-023, FOR-028, FOR-029 e FOR-030",
          ],
          restrictions: ["Não atribui inspetores a projetos (papel da Gestora)", "Não tem acesso ao portal do cliente"] },
        { role: "Responsável Técnico (RT)", icon: "🏛️", color: "#1d4ed8", platforms: ["Web"],
          permissions: [
            "Preencher e assinar FOR-022 C (Análise Crítica de Contratos)",
            "Validar tecnicamente inspeções aprovadas pelo Coordenador",
            "Emitir parecer técnico consolidado",
            "Assinar FOR-023, FOR-028, FOR-029, FOR-030 e FOR-031",
            "Acesso a histórico completo de inspeções",
          ],
          restrictions: ["Não edita checklists", "Não acessa portal do cliente"] },
        { role: "Inspetor", icon: "🔍", color: "#059669", platforms: ["Web", "Mobile"],
          permissions: [
            "Emitir ART vinculada ao projeto (solicitada pela Gestora)",
            "Executar inspeções na sua especialidade de forma concomitante",
            "Preencher FOR-032 (Checklist) e FOR-027 (Relatório de Visita, se Obra/Operação)",
            "Registrar não conformidades que alimentam o FOR-029",
            "Capturar fotos, vídeos, medições e GPS como evidência",
            "Operar completamente offline no mobile",
            "Assinar FOR-023, FOR-027, FOR-028, FOR-029 e FOR-030",
          ],
          restrictions: ["Não valida inspeções de outros inspetores", "Não acessa dados de outros inspetores"] },
        { role: "Cliente / Contratante", icon: "🏢", color: "#b45309", platforms: ["Portal do Cliente"],
          permissions: [
            "Receber e revisar/aprovar o FOR-023 (Plano de Inspeção)",
            "Assinar a Ordem de Serviço e Contrato de Inspeção",
            "Receber FOR-029 (Relatório de Não Conformidade) e responder com tratativas",
            "Visualizar e aprovar Relatório Parcial (FOR-028)",
            "Assinar Relatório Final (FOR-030) e Certificado (FOR-031) via ICP-Brasil",
            "Baixar documentos finais aprovados",
          ],
          restrictions: ["Não acessa dados de outras inspeções", "Não interfere no fluxo interno"] },
        { role: "Auditor / Órgão Regulador", icon: "🔎", color: "#0369a1", platforms: ["Portal de Rastreabilidade"],
          permissions: [
            "Acessar cadeia de evidências via link seguro ou QR Code",
            "Verificar autenticidade de certificados e assinaturas ICP-Brasil",
            "Consultar todos os FORs gerados em uma inspeção",
            "Exportar relatório de auditoria",
          ],
          restrictions: ["Acesso somente leitura", "Não interfere no fluxo de inspeções"] },
      ]},
    ],
  },
  workflow: {
    title: "6. Fluxo End-to-End",
    body: [
      { type: "subtitle", text: "6.1 Modelo Multi-Inspetor Concomitante" },
      { type: "highlight", text: "Múltiplos inspetores podem atuar em paralelo, cada um na sua especialidade (Geometria, Terraplenagem, Drenagem, Pavimentação etc.). Não há dependência de conclusão entre eles. O sistema aguarda que todos concluam para consolidar no Relatório Parcial. Se algum inspetor identificar não conformidade, o FOR-029 é gerado automaticamente vinculado ao item do checklist." },
      { type: "subtitle", text: "6.2 Fluxo Normal — Caminho Feliz" },
      { type: "workflow", steps: [
        { num: "01", actor: "Gestora", action: "Cria a demanda e armazena documentação contratual", detail: "Upload de Carta convite, OS, Contrato, Proposta Técnica/Comercial, Edital, PER. Define tipo (Projeto/Obra/Operação), escopo, inspetores por especialidade e solicita emissão de ART. Sistema gera FOR-022 C e FOR-022 D para preenchimento.", state: "Demanda Criada" },
        { num: "02", actor: "RT", action: "Preenche e assina FOR-022 C", detail: "Análise Crítica de Contratos: valida se o escopo contratual é tecnicamente viável e se a equipe designada é adequada.", state: "Análise Crítica OK" },
        { num: "03", actor: "Coordenador", action: "Preenche FOR-022 D e cria Plano de Inspeção (FOR-023)", detail: "Análise de Completeza da Documentação. Seleciona boneca, personaliza checklist por especialidade, define modo concomitante. FOR-023 segue para assinatura de RT, Coordenador, Inspetores e Cliente.", state: "Plano Criado" },
        { num: "04", actor: "Cliente", action: "Revisa e assina o FOR-023 (Plano de Inspeção)", detail: "Único momento em que o cliente interage antes da execução. Confirma escopo, metodologia e equipe da inspeção.", state: "Plano Aprovado" },
        { num: "05", actor: "Inspetores (paralelo)", action: "Executam concomitantemente por especialidade", detail: "Cada inspetor preenche FOR-032 (Checklist) e, se Obra/Operação, FOR-027 (Relatório de Visita). Não conformidades identificadas geram FOR-029 automaticamente.", state: "Em Execução" },
        { num: "06", actor: "Sistema", action: "Consolida quando todos os inspetores concluem", detail: "Confirma 100% de submissão. Agrupa checklists, evidências e eventuais FOR-029 por especialidade. Libera para validação do Coordenador.", state: "Processando" },
        { num: "07", actor: "Coordenador", action: "Valida checklists e evidências de todos os inspetores", detail: "Pode aprovar consolidado ou rejeitar para inspetor específico. Assina FOR-028 (Relatório Parcial).", state: "Validação Coordenador" },
        { num: "08", actor: "RT", action: "Valida tecnicamente e assina FOR-028", detail: "Análise consolidada de todas as especialidades. Emite parecer técnico. Assina FOR-028.", state: "Validação RT" },
        { num: "09", actor: "Sistema", action: "Gera FOR-028 (Relatório Parcial) e FOR-029 (se houver NCs)", detail: "Consolida dados de todos os inspetores. Se houver não conformidades, FOR-029 é gerado em anexo e encaminhado ao cliente para preenchimento das tratativas.", state: "Relatório Parcial Gerado" },
        { num: "10", actor: "Cliente", action: "Aprova FOR-028 e responde FOR-029 com tratativas", detail: "O cliente não aprova/rejeita o RN — ele preenche as tratativas. A aprovação do FOR-028 dispara o fluxo ICP-Brasil.", state: "Aprovação do Cliente" },
        { num: "11", actor: "Todos os Signatários", action: "Assinaturas ICP-Brasil do FOR-030 e FOR-031", detail: "Todos os inspetores, Coordenador, RT e Cliente assinam digitalmente. Sistema gera Relatório Final (FOR-030) e Certificado (FOR-031).", state: "Finalizado" },
        { num: "12", actor: "Sistema", action: "Publica no Portal de Rastreabilidade", detail: "Gera QR Code e tabela de rastreabilidade vinculando todos os FORs gerados na inspeção.", state: "Auditável" },
      ]},
      { type: "subtitle", text: "6.3 Fluxo de Rejeição" },
      { type: "rejection", steps: [
        { from: "Coord./RT", action: "Rejeita checklist de inspetor específico com comentário", to: "Inspetor" },
        { from: "Inspetor", action: "Corrige e resubmete — sistema incrementa versão automaticamente", to: "Coordenador" },
        { from: "Coordenador", action: "Revalida e aprova — fluxo continua normalmente", to: "RT" },
      ]},
    ],
  },
  documents: {
    title: "7. Documentos e Formulários",
    body: [
      { type: "subtitle", text: "7.1 Cadeia Documental Vinculada" },
      { type: "highlight", text: "Cada documento da cadeia só pode existir se o anterior foi concluído. O sistema impede a geração de FOR-030 sem FOR-028 aprovado, e FOR-031 sem FOR-030 assinado. Essa dependência é automática e não pode ser contornada." },
      { type: "flow", steps: [
        "FOR-022 C/D → Análises iniciais (pré-execução obrigatória)",
        "FOR-023 → Plano de Inspeção (aprovado pelo cliente antes da execução)",
        "FOR-032 → Checklist por inspetor/especialidade (base de tudo)",
        "FOR-027 → Relatório de Visita (apenas Obra e Operação)",
        "FOR-029 → Não Conformidade (gerado automaticamente se NC identificada, vinculado ao item)",
        "FOR-028 → Relatório Parcial (consolida todos os inspetores, não existe sem FOR-032 concluído)",
        "FOR-030 → Relatório Final (só gera após FOR-028 aprovado e FOR-029 respondido)",
        "FOR-031 → Certificado de Inspeção (só gera após FOR-030 assinado)",
      ]},
      { type: "subtitle", text: "7.2 Tabela Completa de Formulários" },
      { type: "table", headers: ["Formulário", "Nome", "Gerado por", "Quem assina", "Quando"], rows: [
        ["FOR-022 A/B", "Proposta Técnica e Comercial", "Gestora (upload)", "Rep. OIA + Rep. Contratante", "Ao criar o projeto"],
        ["FOR-022 C", "Análise Crítica de Contratos", "Sistema (preenchido pelo RT)", "Responsável Técnico", "Antes do planejamento"],
        ["FOR-022 D", "Análise de Completeza da Documentação", "Sistema (preenchido pelo Coord.)", "Coordenador", "Antes do planejamento"],
        ["FOR-023", "Plano de Inspeção", "Coordenador (via boneca)", "RT + Coordenador + Inspetores + Cliente", "Antes da execução"],
        ["FOR-027", "Relatório de Visita", "Inspetor (Obra/Operação)", "Inspetor + Responsável Obra", "Durante execução"],
        ["FOR-028", "Relatório Parcial de Inspeção", "Sistema (automático)", "RT + Coordenador + Inspetores", "Após validação RT"],
        ["FOR-029", "Relatório de Não Conformidade", "Sistema (automático por NC)", "RT + Coordenador + Inspetor", "Quando NC identificada"],
        ["FOR-030", "Relatório Final de Inspeção", "Sistema (automático)", "RT + Coordenador + Inspetores (ICP)", "Após aprovação do cliente"],
        ["FOR-031", "Certificado de Inspeção", "Sistema (automático)", "Responsável Técnico (ICP)", "Após FOR-030 assinado"],
        ["FOR-032", "Checklist de Inspeção", "Sistema (via boneca)", "Inspetor (log sistêmico)", "Durante execução"],
      ]},
      { type: "subtitle", text: "7.3 Tratamento de Não Conformidades (FOR-029)" },
      { type: "paragraph", text: "O FOR-029 é gerado automaticamente pelo sistema quando um inspetor marca um item do checklist como não conforme. Ele é sempre vinculado ao item e à evidência de origem — nunca existe de forma isolada." },
      { type: "list", items: [
        "O FOR-029 é encaminhado ao cliente junto com o FOR-028, em anexo ao Relatório Parcial",
        "O cliente não aprova nem rejeita o RN — ele preenche as tratativas (ações corretivas previstas)",
        "O sistema só libera o FOR-030 após o cliente ter respondido todas as tratativas do FOR-029",
        "Cada versão do FOR-029 é registrada com quem alterou, quando e o quê mudou",
        "A rastreabilidade da NC percorre: item do checklist → evidência fotográfica → RN → tratativa do cliente",
      ]},
    ],
  },
  codification: {
    title: "8. Codificação de Documentos",
    body: [
      { type: "subtitle", text: "8.1 Estrutura do Código" },
      { type: "highlight", text: "O usuário nunca digita o código do documento. O sistema monta automaticamente a partir dos dados do processo. Estrutura: CLIENTE - TIPO - PROPOSTA - OS - SEQ - DISCIPLINA - VERSÃO" },
      { type: "table", headers: ["Campo", "Origem no sistema", "Exemplo", "Regra"], rows: [
        ["CLIENTE", "Cadastro do cliente no projeto", "EPR", "Sigla do cliente, definida no cadastro"],
        ["TIPO", "Tipo de documento selecionado", "RP", "CL, RV, RP, RN, RF, CI — nunca digitado"],
        ["PROPOSTA", "Número da proposta do projeto", "0012025", "Herdado automaticamente do processo"],
        ["OS", "Ordem de Serviço do projeto", "5532025", "Herdado automaticamente do processo"],
        ["SEQ", "Sequencial por tipo + disciplina", "02", "Incremento automático — evita duplicidade"],
        ["DISCIPLINA", "Especialidade do inspetor", "DRE", "Campo vinculado ao inspetor — nunca digitado"],
        ["VERSÃO", "Versionamento automático", "V01", "V00 = primeiro envio, incrementa a cada revisão"],
      ]},
      { type: "subtitle", text: "8.2 Exemplo Real" },
      { type: "paragraph", text: "Código de um Relatório Parcial gerado automaticamente pelo sistema:" },
      { type: "code_example", code: "EPR-RP-0012025-5532025-02-DRE-V01", parts: [
        { part: "EPR", label: "Cliente" },
        { part: "RP", label: "Tipo (Rel. Parcial)" },
        { part: "0012025", label: "Nº Proposta" },
        { part: "5532025", label: "OS" },
        { part: "02", label: "Sequencial (2º RP)" },
        { part: "DRE", label: "Disciplina (Drenagem)" },
        { part: "V01", label: "Versão (1ª revisão)" },
      ]},
      { type: "subtitle", text: "8.3 Controle de Versão" },
      { type: "table", headers: ["Situação", "Ação do Sistema", "Versão Gerada"], rows: [
        ["Primeiro envio do documento", "Cria versão inicial", "V00"],
        ["Ajuste solicitado pelo Coordenador", "Bloqueia V00, cria nova versão", "V01"],
        ["Ajuste solicitado pelo Cliente", "Bloqueia V01, cria nova versão", "V02"],
        ["Nova resubmissão", "Bloqueia V02, cria nova versão", "V03"],
      ]},
      { type: "highlight", text: "Regra inviolável: o sistema nunca sobrescreve uma versão existente. Cada versão é imutável após submissão. A cadeia de versões é sempre preservada e visível na trilha de auditoria." },
      { type: "subtitle", text: "8.4 Status do Documento" },
      { type: "table", headers: ["Status", "Quem pode editar", "O que dispara"], rows: [
        ["Rascunho", "Quem criou o documento", "Criação do registro no sistema"],
        ["Submetido", "Travado para o inspetor", "Inspetor submete o checklist/relatório"],
        ["Em revisão", "Apenas Coordenador ou RT", "Coordenador ou RT solicita ajuste"],
        ["Aprovado", "Ninguém — somente leitura", "Coordenador ou RT aprova"],
        ["Assinado", "Bloqueado — imutável", "Coleta de todas as assinaturas"],
        ["Revisão solicitada", "Gera nova versão automaticamente", "Cliente solicita ajuste no portal"],
      ]},
    ],
  },
  statemachine: {
    title: "9. Máquina de Estados",
    body: [
      { type: "paragraph", text: "Cada inspeção percorre estados bem definidos. O FOR-029 (Não Conformidade) tem seu próprio mini-fluxo dentro da inspeção, pendente e paralelo ao Relatório Parcial." },
      { type: "states", items: [
        { label: "DEMANDA CRIADA", color: "#64748b", desc: "Gestora criou a demanda, documentação contratual armazenada. FOR-022 C e D aguardam preenchimento.", triggers: ["RT preenche FOR-022 C e Coord. preenche FOR-022 D → ANÁLISE_CRÍTICA_OK"] },
        { label: "ANÁLISE CRÍTICA OK", color: "#4f46e5", desc: "FOR-022 C (RT) e FOR-022 D (Coord.) preenchidos e assinados. Coordenador cria Plano de Inspeção.", triggers: ["Coordenador publica FOR-023 → AGUARDANDO_APROVAÇÃO_PLANO"] },
        { label: "AGUARDANDO APROVAÇÃO DO PLANO", color: "#7c3aed", desc: "FOR-023 enviado ao cliente para revisão e assinatura antes da execução.", triggers: ["Cliente assina FOR-023 → PLANO_APROVADO", "Coord. cancela → CANCELADA"] },
        { label: "PLANO APROVADO", color: "#0369a1", desc: "FOR-023 assinado por RT, Coord., Inspetores e Cliente. Inspetores liberados para execução concomitante.", triggers: ["Todos os inspetores iniciam → EM_EXECUÇÃO"] },
        { label: "EM EXECUÇÃO", color: "#7c3aed", desc: "Inspetores preenchendo FOR-032 (e FOR-027 se Obra/Operação) em paralelo. NCs geram FOR-029 automaticamente.", triggers: ["Todos os inspetores submetem → PENDENTE_VALIDAÇÃO_COORD"] },
        { label: "PENDENTE VALIDAÇÃO COORD.", color: "#b45309", desc: "100% dos inspetores submeteram. Coordenador revisa e pode rejeitar para inspetor específico.", triggers: ["Coordenador aprova → PENDENTE_VALIDAÇÃO_RT", "Rejeita → EM_AJUSTE (Inspetor específico)"] },
        { label: "EM AJUSTE (INSPETOR)", color: "#dc2626", desc: "Inspetor corrige o apontado. Sistema cria nova versão do checklist/relatório automaticamente.", triggers: ["Inspetor resubmete → PENDENTE_VALIDAÇÃO_COORD"] },
        { label: "PENDENTE VALIDAÇÃO RT", color: "#b45309", desc: "Coordenador aprovou. RT valida tecnicamente e assina FOR-028.", triggers: ["RT aprova e assina → RELATÓRIO_PARCIAL_GERADO", "RT rejeita → EM_AJUSTE (Coord.)"] },
        { label: "RELATÓRIO PARCIAL GERADO", color: "#059669", desc: "FOR-028 gerado e assinado. Se houver NCs, FOR-029 gerado em anexo. Ambos enviados ao cliente.", triggers: ["Sistema envia FOR-028 + FOR-029 ao cliente → PENDENTE_CLIENTE"] },
        { label: "PENDENTE CLIENTE", color: "#d97706", desc: "Cliente deve aprovar FOR-028 e preencher tratativas no FOR-029 (se houver). Ambas as ações são necessárias.", triggers: ["Cliente aprova FOR-028 e responde FOR-029 → COLETANDO_ASSINATURAS_ICP", "Solicita ajuste → EM_REVISÃO_CLIENTE"] },
        { label: "EM REVISÃO (CLIENTE)", color: "#dc2626", desc: "Coordenador + RT ajustam relatório. Versão incrementa automaticamente.", triggers: ["Coord. resubmete → PENDENTE_VALIDAÇÃO_RT"] },
        { label: "COLETANDO ASSINATURAS ICP", color: "#0369a1", desc: "Coleta sequencial: todos os Inspetores → Coordenador → RT → Cliente. Cada assinatura sobre o hash do documento.", triggers: ["Todas as assinaturas coletadas → FINALIZADO"] },
        { label: "FINALIZADO", color: "#1e293b", desc: "FOR-030 e FOR-031 assinados via ICP-Brasil. Tabela de rastreabilidade e QR Code publicados.", triggers: ["Estado terminal — cadeia de evidências auditável"] },
        { label: "CANCELADA", color: "#94a3b8", desc: "Inspeção cancelada. Todos os registros preservados na trilha de auditoria.", triggers: ["Estado terminal"] },
      ]},
    ],
  },
  doclifecycle: {
    title: "10. Ciclo de Vida de Documentos",
    body: [
      { type: "paragraph", text: "Todos os documentos são entidades versionadas e imutáveis após aprovação. O status é sempre visível e determina quem pode editar e o que acontece a seguir." },
      { type: "subtitle", text: "10.1 Estados de um Documento" },
      { type: "flow", steps: [
        "RASCUNHO — editável por quem criou, código já gerado pelo sistema",
        "SUBMETIDO — travado para o inspetor, aguardando revisão do Coordenador",
        "EM REVISÃO — editável apenas por Coordenador ou RT conforme a etapa",
        "APROVADO — somente leitura, pronto para próxima etapa da cadeia",
        "ASSINADO ICP-BRASIL — bloqueado e imutável, com hash SHA-256 do conteúdo",
        "PUBLICADO — disponível no Portal de Rastreabilidade",
        "RETIFICADO — versão anterior arquivada, nova versão criada com código incrementado",
      ]},
      { type: "subtitle", text: "10.2 Log de Auditoria por Documento" },
      { type: "paragraph", text: "Cada documento mantém um log automático e imutável de todas as ações realizadas sobre ele." },
      { type: "list", items: [
        "Quem criou e quando",
        "Cada alteração: quem fez, quando, o que mudou e qual versão foi gerada",
        "Cada mudança de status com timestamp e IP de origem",
        "Cada assinatura: signatário, nível, timestamp e hash do conteúdo assinado",
        "Cada acesso ao documento por auditor externo",
      ]},
      { type: "subtitle", text: "10.3 Versionamento Semântico" },
      { type: "paragraph", text: "V00 = primeira submissão. V01, V02... = revisões subsequentes. Qualquer edição após submissão obrigatoriamente gera nova versão — nunca sobrescreve. O número de versão faz parte do código do documento e é visível em todos os contextos." },
    ],
  },
  signatures: {
    title: "11. Arquitetura de Assinaturas",
    body: [
      { type: "paragraph", text: "O sistema opera com dois regimes distintos de assinatura, cada um adequado à fase do fluxo e ao nível de formalidade exigido." },
      { type: "subtitle", text: "11.1 Regime 1 — Assinaturas de Processo (Fluxo Interno)" },
      { type: "paragraph", text: "Coletadas durante o fluxo interno, antes da aprovação do cliente. São logs autenticados que formam a trilha de auditoria e têm validade interna, mas não constituem assinatura digital com validade jurídica ICP-Brasil." },
      { type: "table", headers: ["Formulário", "Quem assina (regime interno)", "Momento"], rows: [
        ["FOR-022 C", "Responsável Técnico", "Antes do planejamento"],
        ["FOR-022 D", "Coordenador", "Antes do planejamento"],
        ["FOR-023", "RT + Coordenador + Inspetores + Cliente", "Antes da execução"],
        ["FOR-027", "Inspetor + Responsável Obra", "Durante execução (Obra/Operação)"],
        ["FOR-028", "RT + Coordenador + Inspetores", "Após validação RT (log sistêmico)"],
        ["FOR-029", "RT + Coordenador + Inspetor", "Quando NC identificada (log sistêmico)"],
      ]},
      { type: "subtitle", text: "11.2 Regime 2 — Assinaturas ICP-Brasil (Pós-Aprovação do Cliente)" },
      { type: "highlight", text: "A aprovação do cliente no Portal + resposta às tratativas do FOR-029 são os gatilhos para o início do fluxo ICP-Brasil. A ordem de assinatura é fixa e o sistema só avança quando cada assinatura é coletada." },
      { type: "signature_levels", items: [
        { level: "ICP 1..N", name: "Todos os Inspetores (em paralelo)", actor: "Inspetores", type: "ICP-Brasil", desc: "Cada inspetor assina FOR-030 confirmando responsabilidade técnica pela sua especialidade. O sistema libera todos simultaneamente." },
        { level: "ICP N+1", name: "Coordenador", actor: "Coordenador", type: "ICP-Brasil", desc: "Assina FOR-030 após todos os inspetores. Confirma responsabilidade pela condução do processo." },
        { level: "ICP N+2", name: "Responsável Técnico", actor: "RT", type: "ICP-Brasil", desc: "Assina FOR-030 e FOR-031. Confere validade técnica e legal ao laudo e ao certificado." },
        { level: "ICP N+3", name: "Cliente / Contratante", actor: "Cliente", type: "ICP-Brasil", desc: "Assina FOR-030 e FOR-031. Confirmação final com validade jurídica plena." },
      ]},
      { type: "subtitle", text: "11.3 Ordem de Serviço e Contrato de Inspeção" },
      { type: "paragraph", text: "A Ordem de Serviço e o Contrato de Inspeção são assinados pelo Representante OIA e pelo Representante Contratante no momento da criação do projeto, antes de qualquer etapa de inspeção. O sistema armazena esses documentos e os referencia em todos os FORs subsequentes." },
    ],
  },
  traceability: {
    title: "12. Portal de Rastreabilidade",
    body: [
      { type: "paragraph", text: "Ambiente somente leitura para auditores do INMETRO, ANTT e órgãos reguladores. Expõe a cadeia completa de evidências com todos os FORs gerados na inspeção, equivalente a uma 'tabela de rastreabilidade de diploma' — mostrando o caminho completo percorrido pelo processo." },
      { type: "subtitle", text: "12.1 O que o Portal entrega" },
      { type: "list", items: [
        "QR Code único impresso no FOR-031 (Certificado) — qualquer pessoa pode verificar autenticidade",
        "Tabela de rastreabilidade: lista todos os FORs gerados, suas versões, signatários e datas",
        "Verificação de integridade: hash SHA-256 de cada documento comparável em tempo real",
        "Linha do tempo da inspeção: cada evento registrado com timestamp imutável",
        "Acesso restrito para auditores: visão completa de checklists, evidências fotográficas e pareceres",
      ]},
      { type: "subtitle", text: "12.2 Conteúdo por Nível de Acesso" },
      { type: "table", headers: ["Informação", "Acesso Público (QR/link)", "Acesso Auditor Credenciado"], rows: [
        ["Status e número do certificado (FOR-031)", "✓", "✓"],
        ["Tabela de rastreabilidade dos FORs", "✓", "✓"],
        ["Identidade de todos os signatários ICP-Brasil", "✓", "✓"],
        ["Hash de integridade de cada documento", "✓", "✓"],
        ["FOR-030 e FOR-031 completos", "—", "✓"],
        ["FOR-028 e histórico de versões", "—", "✓"],
        ["FOR-029 e tratativas do cliente", "—", "✓"],
        ["FOR-032 (checklists) com evidências por especialidade", "—", "✓"],
        ["FOR-027 (relatórios de visita) com fotos e GPS", "—", "✓"],
        ["Log de auditoria completo de cada documento", "—", "✓"],
      ]},
      { type: "highlight", text: "Segurança: o Portal é somente leitura, derivado de repositório imutável separado do banco operacional. Qualquer adulteração é detectada pela divergência de hash SHA-256. Nenhuma API de escrita é exposta." },
    ],
  },
  scenario: {
    title: "13. Cenário de Exemplo Completo",
    body: [
      { type: "paragraph", text: "Cenário Torre Alpha — Inspeção de Obra (PQ-13) com 4 inspetores concomitantes, demonstrando a geração de todos os FORs, tratamento de não conformidade e cadeia completa de assinaturas." },
      { type: "scenario", title: "INS-2024-0891 — Inspeção de Obra — Edifício Torre Alpha (PQ-13)", steps: [
        { day: "Dia 1", actor: "Gestora (Carla)", actions: [
          "Cria demanda INS-2024-0891, seleciona tipo: Obra (PQ-13)",
          "Upload: Carta convite, OS-5532025, Contrato, Proposta Técnica EPR-0012025, PER",
          "Designa 4 inspetores: Carlos (GEO), Ana P. (TER), Murilo (DRE), Jael (PAV) — modo concomitante",
          "Solicita emissão de ART para todos os inspetores",
          "Sistema gera automaticamente: FOR-022 C (para RT) e FOR-022 D (para Coordenador)",
          "Sistema gera código do projeto: EPR-0012025-5532025",
        ]},
        { day: "Dia 1 (tarde)", actor: "RT (Dr. Marcos) + Coordenador (Ana)", actions: [
          "Dr. Marcos preenche e assina FOR-022 C: contrato tecnicamente viável, equipe adequada",
          "Coordenador Ana preenche e assina FOR-022 D: documentação completa e aderente ao escopo",
        ]},
        { day: "Dia 2", actor: "Coordenador (Ana)", actions: [
          "Seleciona boneca 'Inspeção de Obra Estrutural' e personaliza por especialidade",
          "Cria FOR-023 (Plano de Inspeção) — código gerado: EPR-PI-0012025-5532025-01-V00",
          "FOR-023 enviado para assinatura de RT, Coordenador, 4 Inspetores e Cliente",
        ]},
        { day: "Dia 2 (tarde)", actor: "Cliente (BetaBuild)", actions: [
          "Recebe FOR-023 no portal, revisa escopo e equipe, assina digitalmente",
          "Inspetores liberados para execução concomitante",
        ]},
        { day: "Dias 3–4", actor: "4 Inspetores (em paralelo)", actions: [
          "Carlos (GEO): preenche FOR-032 com 12 itens, FOR-027 com 8 fotos de campo — código: EPR-CL-0012025-5532025-01-GEO-V00",
          "Ana P. (TER): preenche FOR-032 e FOR-027, 10 itens, 7 fotos",
          "Murilo (DRE): identifica NC em item de drenagem — sistema gera automaticamente FOR-029 vinculado ao item — código: EPR-RN-0012025-5532025-01-DRE-V00",
          "Jael (PAV): preenche FOR-032 e FOR-027, 10 itens, 6 fotos",
          "Todos submetem — sistema consolida e notifica Coordenador",
        ]},
        { day: "Dia 5", actor: "Coordenador (Ana)", actions: [
          "Revisa todos os 4 conjuntos de FOR-032 + FOR-027",
          "Rejeita FOR-027 de Carlos: foto do pilar P-07 desfocada",
          "Carlos recebe notificação, retira nova foto, resubmete — sistema cria EPR-RV-...-GEO-V01",
          "Coordenador aprova todos — assina FOR-028 — código: EPR-RP-0012025-5532025-01-V00",
        ]},
        { day: "Dia 5 (tarde)", actor: "RT (Dr. Marcos)", actions: [
          "Valida tecnicamente todas as especialidades",
          "Assina FOR-028 — parecer: 'Trinca superficial, monitoramento semestral conforme NBR 6118:2014'",
          "Sistema gera FOR-028 V00 com todas as evidências consolidadas",
          "FOR-029 de Murilo também consolidado e assinado por RT + Coord. + Murilo",
        ]},
        { day: "Dia 6", actor: "Cliente (BetaBuild)", actions: [
          "Recebe no portal: FOR-028 (para aprovar) + FOR-029 em anexo (para responder tratativas)",
          "Preenche tratativas no FOR-029: 'Contrataremos empresa X para correção da drenagem em 30 dias'",
          "Solicita ajuste no FOR-028: 'Incluir referência normativa e prazo no parecer da trinca'",
          "Sistema cria FOR-028-V01 e retorna para Coordenador",
        ]},
        { day: "Dia 7", actor: "Coordenador (Ana) + RT (Dr. Marcos)", actions: [
          "RT atualiza parecer com referência à NBR 6118:2014 e prazo de 6 meses",
          "Sistema gera EPR-RP-0012025-5532025-01-V01",
          "Coordenador e RT assinam V01 — enviado novamente ao cliente",
        ]},
        { day: "Dia 8", actor: "Cliente (BetaBuild) + Sistema", actions: [
          "Cliente aprova FOR-028 V01",
          "Sistema confirma: FOR-028 aprovado + FOR-029 com tratativas respondidas",
          "Gatilho disparado: início do fluxo de assinaturas ICP-Brasil",
          "Carlos, Ana P., Murilo e Jael assinam FOR-030 via ICP-Brasil (em paralelo)",
          "Coordenador Ana assina FOR-030 via ICP-Brasil",
          "RT Dr. Marcos assina FOR-030 e FOR-031 via ICP-Brasil",
          "Cliente BetaBuild assina FOR-030 e FOR-031 via ICP-Brasil",
          "Sistema gera FOR-031 (Certificado): código EPR-CI-0012025-5532025-01-V00 com QR Code",
          "Tabela de rastreabilidade publicada no Portal — todos os 10 FORs vinculados e auditáveis",
        ]},
      ]},
      { type: "highlight", text: "Resultado: INS-2024-0891 concluída em 8 dias (PQ-13 — Obra). 4 inspetores concomitantes. 1 NC identificada (FOR-029) com tratativa respondida pelo cliente. 1 ciclo de revisão no FOR-028. 10 formulários gerados com código automático. FOR-031 com 7 assinaturas ICP-Brasil. Tabela de rastreabilidade e QR Code publicados no Portal." },
    ],
  },
};

const archSystems = [
  { id: "web", name: "Sistema Web", icon: "🖥️", color: "#4f46e5", desc: "Plataforma principal de gestão, configuração e validação. Utilizada por Gestora, Coordenador, RT e Inspetor.",
    modules: [
      { id: "gestao", name: "Gestão de Projetos e Contratos", color: "#4f46e5", actor: "Gestora / Gestora de Contratos", pages: [
        { name: "Dashboard Geral", items: ["Visão geral de todas as inspeções e seus estados","Filtros por status, inspetor, prazo, tipo de inspeção","Alertas de SLA, ARTs vencidas e pendências","Métricas de desempenho em tempo real"] },
        { name: "Criar Projeto", items: ["Nome, código interno, cliente vinculado","Tipo de inspeção: Projeto (PQ-12), Obra (PQ-13) ou Operação (PQ-14)","Upload: OS, Contrato, Proposta Técnica/Comercial, Carta convite, Edital, PER","Designar inspetores por especialidade (modo concomitante)","Solicitar emissão de ART para cada inspetor","Definir prazos, SLAs e alertas automáticos"] },
        { name: "Documentação Contratual", items: ["Repositório de documentos do projeto","Visualizar OS, Contrato, Proposta etc.","Controle de versão dos documentos contratuais","Download e compartilhamento autorizado"] },
        { name: "Acompanhamento", items: ["Status em tempo real por etapa e por inspetor","Histórico de atividades do projeto","Alertas de atraso e SLA","Relatórios gerenciais exportáveis"] },
      ]},
      { id: "coord", name: "Coordenação de Inspeção", color: "#7c3aed", actor: "Coordenador", pages: [
        { name: "Meus Projetos", items: ["Lista de projetos atribuídos com status de cada FOR","Notificações de novas demandas e pendências de validação"] },
        { name: "FOR-022 D", items: ["Formulário de Análise de Completeza da Documentação","Checklist de documentos necessários vs. recebidos","Assinar e submeter para liberar planejamento"] },
        { name: "Plano de Inspeção (FOR-023)", items: ["Selecionar boneca base por tipo de inspeção","Personalizar seções e itens por especialidade","Configurar campos obrigatórios e regras condicionais","Visualizar inspetores designados e modo (concomitante)","Publicar — sistema notifica todos os signatários"] },
        { name: "Biblioteca de Bonecas", items: ["Lista de templates por tipo (Projeto/Obra/Operação)","Criar, editar, versionar e clonar bonecas","Histórico de uso por projeto"] },
        { name: "Validação Técnica", items: ["Fila de submissões por inspetor/especialidade","Visualizador de FOR-032 e FOR-027 por especialidade","Aprovar consolidado ou rejeitar para inspetor específico","Revisar e assinar FOR-028 e FOR-029"] },
      ]},
      { id: "rt", name: "Responsável Técnico", color: "#1d4ed8", actor: "RT", pages: [
        { name: "FOR-022 C", items: ["Formulário de Análise Crítica de Contratos","Validar viabilidade técnica do escopo e equipe","Assinar e submeter para liberar planejamento"] },
        { name: "Fila de Validação RT", items: ["Inspeções aprovadas pelo Coordenador aguardando RT","Filtros por tipo de inspeção, urgência e disciplina"] },
        { name: "Revisão Técnica", items: ["Visualizar FOR-032 e FOR-027 por especialidade","Emitir parecer técnico consolidado","Assinar FOR-028, FOR-029, FOR-030 e FOR-031","Rejeitar com justificativa técnica detalhada"] },
        { name: "Histórico de Laudos", items: ["Todas as inspeções validadas","Busca por data, tipo, projeto ou inspetor","Download de pareceres e FORs assinados"] },
      ]},
      { id: "inspetor_web", name: "Área do Inspetor (Web)", color: "#059669", actor: "Inspetor", pages: [
        { name: "Minhas Inspeções", items: ["Lista de inspeções com status por especialidade","Indicador de ART: válida / pendente / vencida","Notificações de liberação para execução"] },
        { name: "Executar FOR-032 (Checklist)", items: ["Formulário dinâmico por especialidade","Marcar item como conforme / não conforme","NC marcada gera FOR-029 automaticamente com vínculo ao item","Capturar fotos, vídeos e medições","GPS automático por item","Auto-save contínuo — nunca perde dados"] },
        { name: "FOR-027 (Relatório de Visita)", items: ["Disponível apenas para Obra e Operação","Registro da visita com data, hora e GPS","Upload de fotos e registros de campo","Assinar e submeter junto com FOR-032"] },
        { name: "Histórico", items: ["FOR-032 e FOR-027 por inspeção","Feedbacks e rejeições recebidas","Versões anteriores dos documentos"] },
      ]},
    ],
  },
  { id: "mobile", name: "App Mobile", icon: "📱", color: "#059669", desc: "Execução de inspeções em campo. Opera 100% offline. Tipo Obra/Operação.",
    modules: [
      { id: "mobile_main", name: "App do Inspetor", color: "#059669", actor: "Inspetor", pages: [
        { name: "Tela Inicial", items: ["Status offline/online sempre visível","Inspeções liberadas para execução","Pendências de sincronização por FOR","Notificações push de liberação e rejeição"] },
        { name: "FOR-032 Offline", items: ["Checklist da especialidade paginado com progresso","Tipos de resposta: texto, número, seleção, foto, GPS","Câmera integrada sem sair do checklist","NC dispara criação de FOR-029 no dispositivo","Auto-save a cada resposta","Submeter automaticamente ao recuperar conexão"] },
        { name: "FOR-027 Offline", items: ["Registro de visita de campo","Fotos georreferenciadas com timestamp","Medições e anotações técnicas","Sincronização com queue prioritária"] },
        { name: "Sincronização", items: ["Fila priorizada: metadados antes de mídias","Upload incremental de fotos e vídeos","Código do documento gerado pelo servidor após sync","Resolução de conflitos com feedback claro"] },
      ]},
    ],
  },
  { id: "portal_cliente", name: "Portal do Cliente", icon: "🏢", color: "#b45309", desc: "Interface para o cliente assinar o Plano de Inspeção, responder não conformidades e aprovar relatórios.",
    modules: [
      { id: "cliente_main", name: "Portal do Cliente", color: "#b45309", actor: "Cliente / Contratante", pages: [
        { name: "Acesso", items: ["Login via link único por inspeção","Sem necessidade de conta complexa","Verificação de identidade simples"] },
        { name: "FOR-023 (Plano de Inspeção)", items: ["Visualização completa do plano","Escopo, metodologia, equipe e cronograma","Aprovação com assinatura (antes da execução)","Solicitação de ajuste com comentários"] },
        { name: "FOR-029 (Não Conformidades)", items: ["Lista de NCs identificadas pelos inspetores","Vinculação: cada NC com foto e item do checklist de origem","Campo para preencher tratativas (ação corretiva prevista)","Prazo para resposta configurável pela Gestora"] },
        { name: "FOR-028 (Relatório Parcial)", items: ["Visualização consolidada por especialidade","Parecer técnico do RT","Histórico de versões do relatório","Aprovar ou solicitar ajuste com comentário"] },
        { name: "Assinatura Final ICP-Brasil", items: ["FOR-030 (Relatório Final) para assinar","FOR-031 (Certificado) para assinar","Fluxo ICP-Brasil com verificação de identidade","Recibo da operação por e-mail"] },
        { name: "Documentos Finais", items: ["Download do FOR-030 (Relatório Final)","Download do FOR-031 (Certificado) com QR Code","Tabela de rastreabilidade de todos os FORs"] },
      ]},
    ],
  },
  { id: "portal_rastreabilidade", name: "Portal de Rastreabilidade", icon: "🔎", color: "#0369a1", desc: "Ambiente somente leitura para INMETRO, ANTT e auditores verificarem a cadeia completa de evidências.",
    modules: [
      { id: "rastrear_publico", name: "Verificação Pública (QR Code)", color: "#0369a1", actor: "Qualquer pessoa com QR Code / link", pages: [
        { name: "Verificação de Certificado", items: ["Status e número do FOR-031","Tabela de rastreabilidade dos FORs gerados","Identidade dos signatários ICP-Brasil","Hash de integridade de cada documento","Verificação de autenticidade em tempo real"] },
      ]},
      { id: "rastrear_auditor", name: "Acesso Auditor Credenciado", color: "#0284c7", actor: "Auditor / INMETRO / ANTT", pages: [
        { name: "Busca e Filtros", items: ["Por número de certificado, CNPJ, período","Por tipo de inspeção (PQ-12/13/14)","Por inspetor, especialidade ou disciplina"] },
        { name: "Cadeia de Evidências", items: ["Linha do tempo completa com todos os FORs","FOR-032 com evidências por especialidade","FOR-029 e tratativas do cliente","Logs de validação e assinaturas"] },
        { name: "Documentos Completos", items: ["Acesso a todos os FORs da inspeção","Histórico de versões de cada documento","Pareceres técnicos do RT","Comparação entre versões"] },
        { name: "Exportação", items: ["Relatório de auditoria em PDF","Tabela de rastreabilidade em JSON/XML","Exportação de evidências fotográficas por especialidade"] },
      ]},
    ],
  },
  { id: "admin_system", name: "Administração do Sistema", icon: "⚙️", color: "#db2777", desc: "Gestão de usuários, bonecas, configurações globais e parâmetros de codificação.",
    modules: [
      { id: "admin_main", name: "Painel Administrativo", color: "#db2777", actor: "Administrador", pages: [
        { name: "Usuários e Papéis", items: ["Cadastrar, editar e inativar usuários","Definir papel e especialidade por usuário","Vincular inspetor a coordenador","Controlar ARTs: upload, validade e alertas de vencimento"] },
        { name: "Codificação de Documentos", items: ["Cadastrar siglas de clientes","Configurar tipos de documento (CL, RV, RP, RN, RF, CI)","Definir disciplinas e suas siglas (GEO, TER, DRE, PAV...)","Regras de sequencial por tipo e disciplina"] },
        { name: "Configurações de Workflow", items: ["Parâmetros de SLA por etapa e tipo de inspeção","Templates de notificação (e-mail, push)","Regras de geração automática de FOR-029","Configurações de integração ICP-Brasil"] },
        { name: "Clientes e Auditores", items: ["Cadastro de clientes (CNPJ, contato, representante)","Cadastro de auditores externos com escopo de acesso","Emitir e revogar credenciais de acesso ao portal"] },
      ]},
    ],
  },
];

function Badge({ text, color }) {
  return (
    <span style={{ background: color + "18", color, border: `1px solid ${color}40`, borderRadius: 4, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>
      {text}
    </span>
  );
}

function CodeExample({ code, parts }) {
  const colors = ["#4f46e5","#7c3aed","#1d4ed8","#059669","#b45309","#0369a1","#dc2626"];
  return (
    <div style={{ margin: "16px 0" }}>
      <div style={{ background: "#1e293b", borderRadius: 8, padding: "16px 20px", marginBottom: 16, fontFamily: "monospace", fontSize: 18, fontWeight: 700, color: "#f8fafc", letterSpacing: 2, textAlign: "center" }}>{code}</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {parts.map((p, i) => (
          <div key={i} style={{ background: colors[i % colors.length] + "12", border: `1.5px solid ${colors[i % colors.length]}40`, borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
            <div style={{ fontFamily: "monospace", fontWeight: 800, fontSize: 14, color: colors[i % colors.length] }}>{p.part}</div>
            <div style={{ fontSize: 11, color: T.textMuted, marginTop: 3 }}>{p.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArchInteractive() {
  const [selSystem, setSelSystem] = useState(null);
  const [selModule, setSelModule] = useState(null);
  const [selPage, setSelPage] = useState(null);

  const sys = archSystems.find(s => s.id === selSystem);
  const mod = sys ? sys.modules.find(m => m.id === selModule) : null;
  const page = mod ? mod.pages.find(p => p.name === selPage) : null;

  const reset = () => { setSelSystem(null); setSelModule(null); setSelPage(null); };
  const pickSys = (id) => { setSelSystem(id); setSelModule(null); setSelPage(null); };
  const pickMod = (id) => { setSelModule(id); setSelPage(null); };
  const btnBase = { background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 14, fontWeight: 600 };

  return (
    <div style={{ margin: "8px 0" }}>
      {selSystem && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          <button onClick={reset} style={{ ...btnBase, color: T.accent }}>← Todos os Sistemas</button>
          {selModule && <><span style={{ color: T.textMuted }}>/</span><button onClick={() => { setSelModule(null); setSelPage(null); }} style={{ ...btnBase, color: T.accent }}>{sys ? sys.name : ""}</button></>}
          {selPage && <><span style={{ color: T.textMuted }}>/</span><button onClick={() => setSelPage(null)} style={{ ...btnBase, color: T.accent }}>{mod ? mod.name : ""}</button><span style={{ color: T.textMuted }}>/</span><span style={{ color: T.textSub, fontSize: 14 }}>{selPage}</span></>}
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
            <div style={{ color: T.textSub, fontSize: 13, marginTop: 3 }}>Ator: <span style={{ fontWeight: 600 }}>{mod.actor}</span></div>
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
          { x: 5, label: ["Gestora /", "Gest. Contratos"], color: "#4f46e5" },
          { x: 135, label: ["Coordenador", "de Inspeção"], color: "#7c3aed" },
          { x: 265, label: ["Responsável", "Técnico (RT)"], color: "#1d4ed8" },
          { x: 395, label: ["Auditor /", "Órgão Reg."], color: "#0369a1" },
        ].map((r, i) => (
          <g key={i}>
            <rect x={r.x} y={82} width={120} height={48} rx={8} fill={r.color + "12"} stroke={r.color + "50"} strokeWidth="1.5"/>
            {r.label.map((t, j) => <text key={j} x={r.x + 60} y={102 + j * 16} textAnchor="middle" fontSize="12" fontWeight="600" fill={r.color}>{t}</text>)}
          </g>
        ))}
        <line x1={195} y1={130} x2={195} y2={148} stroke="#cbd5e1" strokeWidth="1.5"/>
        <rect x={135} y={148} width={120} height={42} rx={8} fill="#05996912" stroke="#05996950" strokeWidth="1.5"/>
        <text x={195} y={173} textAnchor="middle" fontSize="12" fontWeight="600" fill="#059669">Inspetores</text>
        <line x1={65} y1={130} x2={65} y2={148} stroke="#cbd5e1" strokeWidth="1.5"/>
        <rect x={5} y={148} width={120} height={42} rx={8} fill="#b4530912" stroke="#b4530950" strokeWidth="1.5"/>
        <text x={65} y={173} textAnchor="middle" fontSize="12" fontWeight="600" fill="#b45309">Cliente</text>
        <text x={260} y={218} textAnchor="middle" fontSize="11" fill="#94a3b8">Hierarquia operacional do sistema</text>
      </svg>
    </div>
  );
}

const SENHA = "houer_e_guidance";
function TelaLogin({ onLogin }) {
  const [input, setInput] = useState("");
  const [erro, setErro] = useState(false);
  const tentar = () => {
    if (input === SENHA) { onLogin(); }
    else { setErro(true); setInput(""); setTimeout(() => setErro(false), 2000); }
  };
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: T.bg, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ background: T.card, border: `1.5px solid ${T.cardBorder}`, borderRadius: 16, padding: "48px 40px", width: 360, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", textAlign: "center" }}>
        <div style={{ fontSize: 36, marginBottom: 16 }}>🔒</div>
        <div style={{ fontSize: 11, color: T.accent, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Acesso Restrito</div>
        <div style={{ fontSize: 18, color: T.text, fontWeight: 800, marginBottom: 6 }}>Sistema de Gestão de Inspeções</div>
        <div style={{ fontSize: 13, color: T.textMuted, marginBottom: 32 }}>Documentação Técnica — Arquitetura de Produto</div>
        <input type="password" placeholder="Digite a senha de acesso" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && tentar()}
          style={{ width: "100%", padding: "12px 16px", fontSize: 14, borderRadius: 8, border: `1.5px solid ${erro ? "#ef4444" : T.cardBorder}`, outline: "none", boxSizing: "border-box", background: erro ? "#fef2f2" : "#f8fafc", color: T.text, marginBottom: 12, transition: "all 0.2s" }} />
        {erro && <div style={{ fontSize: 13, color: "#ef4444", marginBottom: 12, fontWeight: 600 }}>Senha incorreta. Tente novamente.</div>}
        <button onClick={tentar} style={{ width: "100%", padding: "12px", fontSize: 14, fontWeight: 700, background: T.accent, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
          Entrar
        </button>
        <div style={{ fontSize: 11, color: T.textMuted, marginTop: 24 }}>Houer © 2025 · Uso interno</div>
      </div>
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
        if (block.type === "code_example") return <CodeExample key={i} code={block.code} parts={block.parts} />;
        if (block.type === "paragraph") return <p key={i} style={{ color: T.textSub, lineHeight: 1.8, marginBottom: 18, fontSize: 15 }}>{block.text}</p>;
        if (block.type === "subtitle") return <h3 key={i} style={{ color: T.text, fontSize: 16, fontWeight: 700, marginTop: 28, marginBottom: 12, borderLeft: `3px solid ${T.accent}`, paddingLeft: 12 }}>{block.text}</h3>;
        if (block.type === "highlight") return <div key={i} style={{ background: T.highlight, border: `1px solid ${T.highlightBorder}`, borderRadius: 8, padding: 18, margin: "18px 0", color: T.highlightText, fontSize: 14, lineHeight: 1.8 }}>{block.text}</div>;
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
            {block.items.map((item, j) => <li key={j} style={{ color: T.textSub, marginBottom: 10, lineHeight: 1.7, fontSize: 14 }}>{item}</li>)}
          </ul>
        );
        if (block.type === "table") return (
          <div key={i} style={{ overflowX: "auto", margin: "18px 0", borderRadius: 8, border: `1px solid ${T.cardBorder}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead><tr>{block.headers.map((h, j) => <th key={j} style={{ background: T.tableHead, color: T.tableHeadText, padding: "12px 16px", textAlign: "left", borderBottom: `1px solid ${T.cardBorder}`, fontWeight: 700, fontSize: 13 }}>{h}</th>)}</tr></thead>
              <tbody>{block.rows.map((row, j) => (
                <tr key={j} style={{ borderBottom: `1px solid ${T.rowBorder}`, background: j % 2 === 0 ? "#ffffff" : "#fafafa" }}>
                  {row.map((cell, k) => <td key={k} style={{ padding: "12px 16px", color: k === 0 ? T.text : T.textSub, fontSize: 14, fontWeight: k === 0 ? 600 : 400 }}>{cell}</td>)}
                </tr>
              ))}</tbody>
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
                <div style={{ width: 40, height: 40, borderRadius: 8, background: T.accentLight, color: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, flexShrink: 0, textAlign: "center" }}>{sig.level}</div>
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
                  {step.actions.map((a, k) => <div key={k} style={{ fontSize: 13, color: T.textSub, marginBottom: 5, paddingLeft: 10, borderLeft: `2px solid ${T.cardBorder}`, lineHeight: 1.6 }}>• {a}</div>)}
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
  const [logado, setLogado] = useState(false);
  if (!logado) return <TelaLogin onLogin={() => setLogado(true)} />;
  return (
    <div style={{ display: "flex", height: "100vh", background: T.bg, fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: T.text, overflow: "hidden" }}>
      <div style={{ width: 280, flexShrink: 0, background: T.sidebar, borderRight: `1px solid ${T.sidebarBorder}`, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px 20px 16px", borderBottom: `1px solid ${T.sidebarBorder}` }}>
          <div style={{ fontSize: 11, color: T.accent, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>Documentação Técnica</div>
          <div style={{ fontSize: 15, color: T.text, fontWeight: 800, lineHeight: 1.4 }}>Sistema de Gestão de Inspeções</div>
          <div style={{ fontSize: 12, color: T.textMuted, marginTop: 4 }}>Arquitetura de Produto v3.0</div>
        </div>
        <nav style={{ padding: "10px 0", flex: 1 }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)} style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 20px", fontSize: 13, fontWeight: active === s.id ? 700 : 500, color: active === s.id ? T.accent : T.textSub, background: active === s.id ? T.accentLight : "transparent", border: "none", borderLeft: active === s.id ? `3px solid ${T.accent}` : "3px solid transparent", cursor: "pointer", lineHeight: 1.5, transition: "all 0.15s" }}>
              {s.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: 16, borderTop: `1px solid ${T.sidebarBorder}` }}>
          <div style={{ fontSize: 11, color: T.textMuted, textAlign: "center" }}>Houer © 2025 · Uso interno</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "36px 48px" }}>
        <h2 style={{ color: T.text, fontSize: 24, fontWeight: 800, marginBottom: 28, paddingBottom: 18, borderBottom: `1px solid ${T.cardBorder}` }}>
          {content[active] ? content[active].title : ""}
        </h2>
        {renderContent(active)}
      </div>
    </div>
  );
}
