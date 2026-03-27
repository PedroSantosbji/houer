import { useState } from "react";

const SENHA = "houer_e_guidance";

const T = {
  bg:"#f4f5f7", sidebar:"#ffffff", sidebarBorder:"#e8eaed",
  card:"#ffffff", cardBorder:"#e8eaed", text:"#1a1d23",
  textSub:"#5f6472", textMuted:"#9ba3b4",
  accent:"#3b5bdb", accentLight:"#eef1fd",
  green:"#2f9e44", greenLight:"#ebfbee",
  orange:"#e67700", orangeLight:"#fff9db",
  purple:"#6741d9", purpleLight:"#f3f0ff",
  teal:"#0c8599", tealLight:"#e3fafc",
  red:"#c92a2a", redLight:"#fff5f5",
  tableHead:"#f8f9fa", rowBorder:"#f1f3f5",
};

// ─── NAV ─────────────────────────────────────────────────────────────────────
const navItems = [
  { group:"PRODUTO", items:[
    { id:"overview",     label:"Visão Geral",       icon:"□" },
    { id:"architecture", label:"Arquitetura",        icon:"⊞" },
    { id:"roles",        label:"Papéis e Acessos",   icon:"◎" },
    { id:"documents",    label:"Documentos & Fluxo", icon:"≡" },
    { id:"codification", label:"Codificação",        icon:"{}" },
    { id:"signatures",   label:"Assinaturas",        icon:"✍" },
    { id:"traceability", label:"Rastreabilidade",    icon:"⌖" },
    { id:"scenario",     label:"Cenário de Exemplo", icon:"○" },
  ]},
  { group:"ENTREGA", items:[
    { id:"roadmap",   label:"Roadmap",    icon:"○" },
    { id:"team",      label:"Equipe",     icon:"○" },
    { id:"estimates", label:"Estimativas",icon:"○" },
  ]},
];

// ─── SHARED DATA ─────────────────────────────────────────────────────────────
const systems = [
  { id:"web",   abbr:"WB", label:"Sistema Web",            type:"Web · Sistema Unificado",       color:T.accent, bg:T.accentLight,
    tags:["AD · Administrador","GT · Gestora/Contratos","CO · Coordenador","RT · Resp. Técnico","IN · Inspetor"],
    features:["Dashboard por perfil de acesso","Gestão de projetos e contratos","Cadastros e configurações (Admin)","Criação de Plano de Inspeção (bonecas)","Validação técnica Coord. + RT","Geração automática de FORs","Biblioteca de bonecas/templates","Notificações e alertas de SLA"] },
  { id:"mobile",label:"MB", abbr:"MB", label2:"App Mobile", type:"React Native · Offline-First",  color:T.green, bg:T.greenLight,
    tags:["IN · Inspetor"],
    features:["FOR-032 offline com auto-save","FOR-027 com fotos georreferenciadas","NC dispara FOR-029 automaticamente","Check-in com geofence + GPS","Câmera integrada ao checklist","Sincronização inteligente em background","Fila de upload incremental","Onboarding guiado (1ª vez)"] },
  { id:"client",abbr:"PC", label:"Portal do Cliente",      type:"Web · Contratante",             color:T.orange, bg:T.orangeLight,
    tags:["CL · Cliente / Contratante"],
    features:["Acesso via link único por inspeção","Assinar FOR-023 antes da execução","Responder FOR-029 com tratativas","Aprovar FOR-028 (Relatório Parcial)","Assinar FOR-030 e FOR-031 via ICP-Brasil","Download de documentos finais","QR Code do certificado","Histórico de interações"] },
  { id:"trace", abbr:"PR", label:"Portal de Rastreabilidade", type:"Web · Auditores / Reguladores", color:T.teal, bg:T.tealLight,
    tags:["AU · Auditor","IN · INMETRO","AN · ANTT"],
    features:["Consulta por QR Code ou link único","Tabela de rastreabilidade dos FORs","Verificação de integridade SHA-256","Visualização de todos os signatários ICP","Documentos completos (acesso restrito)","Linha do tempo da inspeção","Exportação em PDF / JSON / XML","Painel regulatório agregado"] },
];

const roles = [
  { abbr:"AD", label:"Administrador",                sub:"Sistema Web · Acesso total",      color:T.accent, bg:T.accentLight,
    permissions:["Cadastrar e gerenciar todos os usuários","Definir papéis, especialidades e ARTs","Configurar codificação de documentos","Definir SLAs e templates de notificação","Emitir e revogar credenciais de auditores"],
    restrictions:[] },
  { abbr:"GT", label:"Gestora / Gestora de Contratos", sub:"Sistema Web",                   color:T.purple, bg:T.purpleLight,
    permissions:["Criar projetos e armazenar documentação contratual completa (OS, Contrato, Proposta, Edital, PER)","Designar inspetores por especialidade (modo concomitante)","Solicitar emissão de ART para cada inspetor","Monitorar SLAs e progresso em tempo real","Gerar relatórios gerenciais","Solicitar complementações a inspetor(es) específico(s)"],
    restrictions:["Não executa validações técnicas","Não edita bonecas ou checklists"] },
  { abbr:"CO", label:"Coordenador de Inspeção",       sub:"Sistema Web",                   color:T.green, bg:T.greenLight,
    permissions:["Preencher e assinar FOR-022 D (Análise de Completeza)","Criar FOR-023 (Plano de Inspeção) a partir de boneca","Personalizar checklist por especialidade e configurar regras condicionais","Validar checklists e evidências de todos os inspetores","Aprovar ou rejeitar para inspetor específico","Assinar FOR-023, FOR-028, FOR-029, FOR-030"],
    restrictions:["Não designa inspetores a projetos (papel da Gestora)","Não tem acesso ao portal do cliente"] },
  { abbr:"RT", label:"Responsável Técnico",           sub:"Sistema Web",                   color:T.teal, bg:T.tealLight,
    permissions:["Preencher e assinar FOR-022 C (Análise Crítica de Contratos)","Validar tecnicamente todas as especialidades após aprovação do Coordenador","Emitir parecer técnico consolidado","Assinar FOR-023, FOR-028, FOR-029, FOR-030, FOR-031"],
    restrictions:["Não edita checklists ou bonecas","Não tem acesso ao portal do cliente"] },
  { abbr:"IN", label:"Inspetor",                     sub:"Sistema Web + App Mobile",       color:T.orange, bg:T.orangeLight,
    permissions:["Emitir ART vinculada ao projeto","Executar inspeções concomitantemente na sua especialidade","Preencher FOR-032 (Checklist) e FOR-027 (Relatório de Visita, se Obra/Operação)","NCs identificadas alimentam FOR-029 automaticamente","Operar 100% offline no mobile com sincronização posterior","Assinar FOR-023, FOR-027, FOR-028, FOR-029, FOR-030"],
    restrictions:["Não valida inspeções de outros inspetores","Não acessa dados de outros inspetores"] },
  { abbr:"CL", label:"Cliente / Contratante",        sub:"Portal do Cliente",              color:T.red, bg:T.redLight,
    permissions:["Assinar Ordem de Serviço e Contrato de Inspeção","Revisar e assinar FOR-023 antes da execução","Receber FOR-029 e preencher tratativas (ações corretivas)","Aprovar FOR-028 (Relatório Parcial)","Assinar FOR-030 e FOR-031 via ICP-Brasil","Download de documentos finais"],
    restrictions:["Não acessa dados de outras inspeções","Não interfere no fluxo interno de validação"] },
];

const forDocs = [
  { code:"FOR-022 C", name:"Análise Crítica de Contratos",        who:"RT",                               when:"Pré-execução",          tipo:["P","O","Op"], color:T.teal },
  { code:"FOR-022 D", name:"Análise de Completeza da Doc.",        who:"Coordenador",                      when:"Pré-execução",          tipo:["P","O","Op"], color:T.teal },
  { code:"FOR-023",   name:"Plano de Inspeção",                   who:"RT + Coord + Inspetores + Cliente", when:"Antes da execução",     tipo:["P","O","Op"], color:T.green },
  { code:"FOR-032",   name:"Checklist de Inspeção",               who:"Inspetor (log sistêmico)",          when:"Durante execução",      tipo:["P","O","Op"], color:T.accent },
  { code:"FOR-027",   name:"Relatório de Visita",                 who:"Inspetor + Resp. Obra",             when:"Obra e Operação",       tipo:["O","Op"],     color:T.accent },
  { code:"FOR-029",   name:"Relatório de Não Conformidade",       who:"RT + Coord + Inspetor",             when:"Automático por NC",     tipo:["P","O","Op"], color:T.red },
  { code:"FOR-028",   name:"Relatório Parcial de Inspeção",       who:"RT + Coord + Inspetores (log)",     when:"Após validação RT",     tipo:["P","O","Op"], color:T.purple },
  { code:"FOR-030",   name:"Relatório Final de Inspeção",         who:"Todos (ICP-Brasil)",                when:"Após aprovação cliente", tipo:["P","O","Op"], color:T.orange },
  { code:"FOR-031",   name:"Certificado de Inspeção",             who:"RT (ICP-Brasil)",                   when:"Após FOR-030 assinado", tipo:["P","O","Op"], color:T.orange },
];

const workflowSteps = [
  { num:"01", actor:"Gestora",               tag:"GT",  color:T.purple,   action:"Cria demanda e armazena documentação contratual",     detail:"Upload de OS, Contrato, Proposta, Edital, PER. Designa inspetores por especialidade (modo concomitante). Solicita ARTs. Sistema gera FOR-022 C (para RT) e FOR-022 D (para Coordenador) automaticamente.", state:"Demanda Criada" },
  { num:"02", actor:"RT + Coordenador",      tag:"RT CO",color:T.teal,    action:"Preenchem FOR-022 C e FOR-022 D",                     detail:"RT: Análise Crítica de Contratos. Coordenador: Análise de Completeza da Documentação. Ambos assinam antes de qualquer execução.", state:"Análise Crítica OK" },
  { num:"03", actor:"Coordenador",           tag:"CO",  color:T.green,    action:"Cria Plano de Inspeção (FOR-023) via boneca",          detail:"Seleciona template base, personaliza checklist por especialidade. FOR-023 enviado para assinatura sequencial: RT → Coord. → Inspetores → Cliente.", state:"Plano Criado" },
  { num:"04", actor:"Cliente",               tag:"CL",  color:T.orange,   action:"Revisa e assina FOR-023",                             detail:"Único momento de interação do cliente antes da execução. Confirma escopo, metodologia e equipe. Sem assinatura, execução bloqueada.", state:"Plano Aprovado" },
  { num:"05", actor:"Inspetores (paralelo)", tag:"IN",  color:T.orange,   action:"Executam concomitantemente por especialidade",         detail:"Preenchem FOR-032 e FOR-027 (Obra/Operação). NCs geram FOR-029 automaticamente vinculado ao item e à evidência de origem.", state:"Em Execução" },
  { num:"06", actor:"Sistema",               tag:"SYS", color:T.textMuted,action:"Consolida quando 100% dos inspetores concluem",        detail:"Confirma submissão completa. Agrupa checklists, evidências e FORs-029 por especialidade. Libera para validação do Coordenador.", state:"Processando" },
  { num:"07", actor:"Coordenador",           tag:"CO",  color:T.green,    action:"Valida e assina FOR-028",                             detail:"Revisa checklists e evidências de todos os inspetores. Pode rejeitar individualmente. Assina FOR-028 quando aprovado.", state:"Validação Coord." },
  { num:"08", actor:"RT",                    tag:"RT",  color:T.teal,     action:"Valida tecnicamente e assina FOR-028",                 detail:"Análise técnica consolidada de todas as especialidades. Emite parecer técnico formal. Assina FOR-028 (log sistêmico).", state:"Validação RT" },
  { num:"09", actor:"Sistema",               tag:"SYS", color:T.textMuted,action:"Gera FOR-028 + FOR-029 (se houver NCs)",               detail:"FOR-028 enviado ao cliente para aprovação. FOR-029 enviado em anexo para o cliente preencher tratativas (não aprovar — só responder).", state:"Rel. Parcial Gerado" },
  { num:"10", actor:"Cliente",               tag:"CL",  color:T.orange,   action:"Aprova FOR-028 e responde tratativas no FOR-029",      detail:"Ambas as ações obrigatórias para liberar o fluxo ICP-Brasil. Sistema bloqueia até tudo estar concluído.", state:"Aprovação Cliente" },
  { num:"11", actor:"Todos os Signatários",  tag:"ALL", color:T.accent,   action:"Assinaturas ICP-Brasil (FOR-030 e FOR-031)",           detail:"Ordem fixa: Inspetores (paralelo) → Coord. → RT → Cliente. Sistema gera FOR-030 e FOR-031 com validade jurídica plena.", state:"Finalizado" },
  { num:"12", actor:"Sistema",               tag:"SYS", color:T.textMuted,action:"Publica no Portal de Rastreabilidade",                 detail:"QR Code gerado e impresso no FOR-031. Tabela de rastreabilidade publicada com todos os FORs vinculados.", state:"Auditável" },
];

const states = [
  { label:"DEMANDA CRIADA",               color:"#64748b", desc:"FOR-022 C (RT) e FOR-022 D (Coord.) aguardam preenchimento.", triggers:["RT + Coord. preenchem FORs → ANÁLISE_CRÍTICA_OK","Gestora cancela → CANCELADA"] },
  { label:"ANÁLISE CRÍTICA OK",           color:T.accent,  desc:"FOR-022 C e D assinados. Coordenador cria o Plano (FOR-023).", triggers:["Coord. publica FOR-023 → AGUARDANDO_APROVAÇÃO_PLANO"] },
  { label:"AGUARDANDO APROVAÇÃO DO PLANO",color:T.purple,  desc:"FOR-023 enviado ao cliente. Execução bloqueada até assinatura.", triggers:["Cliente assina → PLANO_APROVADO","Coord. cancela → CANCELADA"] },
  { label:"PLANO APROVADO",               color:T.teal,    desc:"FOR-023 assinado por todos. Inspetores liberados concomitantemente.", triggers:["Todos os inspetores iniciam → EM_EXECUÇÃO"] },
  { label:"EM EXECUÇÃO",                  color:T.green,   desc:"Inspetores preenchem FOR-032 e FOR-027 em paralelo. NCs geram FOR-029.", triggers:["Todos submetem → PENDENTE_VALIDAÇÃO_COORD","Gestora cancela → CANCELADA"] },
  { label:"PENDENTE VALIDAÇÃO COORD.",    color:T.orange,  desc:"100% concluído. Coord. revisa e pode rejeitar individualmente.", triggers:["Aprova → PENDENTE_VALIDAÇÃO_RT","Rejeita → EM_AJUSTE_INSPETOR"] },
  { label:"EM AJUSTE (INSPETOR)",         color:T.red,     desc:"Inspetor corrige. Sistema cria nova versão automaticamente.", triggers:["Inspetor resubmete → PENDENTE_VALIDAÇÃO_COORD"] },
  { label:"PENDENTE VALIDAÇÃO RT",        color:T.orange,  desc:"RT valida tecnicamente e assina FOR-028.", triggers:["RT aprova → RELATÓRIO_PARCIAL_GERADO","RT rejeita → EM_AJUSTE_COORD"] },
  { label:"EM AJUSTE (COORD.)",           color:T.red,     desc:"Coord. corrige conforme RT. Versão incrementa automaticamente.", triggers:["Coord. resubmete → PENDENTE_VALIDAÇÃO_RT"] },
  { label:"RELATÓRIO PARCIAL GERADO",     color:T.green,   desc:"FOR-028 + FOR-029 (se NC) enviados ao cliente.", triggers:["Sistema envia → PENDENTE_CLIENTE"] },
  { label:"PENDENTE CLIENTE",             color:T.orange,  desc:"Cliente aprova FOR-028 E responde tratativas do FOR-029. Ambas obrigatórias.", triggers:["Tudo concluído → COLETANDO_ASSINATURAS_ICP","Solicita ajuste → EM_REVISÃO_CLIENTE"] },
  { label:"EM REVISÃO (CLIENTE)",         color:T.red,     desc:"Coord. + RT ajustam FOR-028. Versão incrementa automaticamente.", triggers:["Resubmete → PENDENTE_VALIDAÇÃO_RT"] },
  { label:"COLETANDO ASSINATURAS ICP",    color:T.accent,  desc:"Inspetores (paralelo) → Coord. → RT → Cliente. Cada etapa bloqueia a próxima.", triggers:["Todas coletadas → FINALIZADO"] },
  { label:"FINALIZADO",                   color:"#1e293b", desc:"FOR-030 e FOR-031 assinados. QR Code e tabela publicados.", triggers:["Estado terminal — imutável"] },
  { label:"CANCELADA",                    color:"#94a3b8", desc:"Cancelada pela Gestora. Todos os registros preservados.", triggers:["Estado terminal"] },
];

const estApps = [
  { label:"Backend (NestJS + PostgreSQL)", hours:1920, color:T.accent, items:[
    {n:"Autenticação e Autorização (RBAC)",h:135},{n:"Gestão de Entidades",h:145},{n:"Motor de Workflow + Máquina de Estados",h:260},{n:"Plano de Inspeção + Bonecas",h:150},{n:"Execução de Inspeção (Core API)",h:180},{n:"Documentos e Versionamento",h:205},{n:"Fluxo de Aprovação",h:160},{n:"Assinatura ICP-Brasil",h:330},{n:"Portal de Rastreabilidade (API)",h:140},{n:"Notificações e Comunicação",h:95},{n:"Infraestrutura lógica",h:120}]},
  { label:"Web App", hours:795, color:"#7c3aed", items:[
    {n:"Base do sistema",h:115},{n:"Gestão de Projetos",h:125},{n:"Coordenação de Inspeção",h:145},{n:"Execução Web (Inspetor)",h:125},{n:"Revisão e Aprovação",h:125},{n:"Documentos UI",h:80},{n:"Biblioteca de Templates",h:80}]},
  { label:"Mobile App (React Native)", hours:590, color:T.green, items:[
    {n:"Base",h:65},{n:"Offline-first engine",h:240},{n:"Execução de inspeção",h:160},{n:"Mídia e sensores",h:125}]},
  { label:"DevOps + QA", hours:330, color:T.teal, items:[
    {n:"CI/CD",h:45},{n:"Infra AWS",h:65},{n:"Segurança",h:30},{n:"Testes integrados",h:95},{n:"Testes fluxo completo",h:95}]},
  { label:"Portal de Rastreabilidade", hours:185, color:"#06b6d4", items:[
    {n:"Consulta por código/QR",h:35},{n:"Visualização documento",h:45},{n:"Histórico e logs",h:45},{n:"Exibição de hashes",h:30},{n:"UI pública/restrita",h:30}]},
  { label:"Portal do Cliente", hours:150, color:T.orange, items:[
    {n:"Acesso por link/token",h:20},{n:"Visualização relatório parcial",h:45},{n:"Aprovação/rejeição",h:35},{n:"Comentários e tratativas",h:30},{n:"Histórico",h:20}]},
];

// Roadmap — only product features, exactly as per the PDF
const ganttFeatures = [
  // BACKEND
  { section:"BACKEND",    label:"Arquitetura, Modelagem, Setup da infra",    bg:"#3b5bdb", start:1, end:2 },
  { section:"BACKEND",    label:"Auth + RBAC, Entidades",                    bg:"#3b5bdb", start:2, end:3 },
  { section:"BACKEND",    label:"Workflow, Plano inspeção",                  bg:"#3b5bdb", start:3, end:4 },
  { section:"BACKEND",    label:"Execução inspeção, Upload mídia, Documentos",bg:"#3b5bdb", start:4, end:5 },
  { section:"BACKEND",    label:"Ajustes API, Versionamento + hash",         bg:"#3b5bdb", start:5, end:6 },
  { section:"BACKEND",    label:"Aprovação fluxo, Documentos completos",     bg:"#3b5bdb", start:6, end:7 },
  { section:"BACKEND",    label:"ICP, Suporte AP",                           bg:"#3b5bdb", start:7, end:8 },
  { section:"BACKEND",    label:"ICP + auditoria, API rastreabilidade",      bg:"#3b5bdb", start:8, end:9 },
  { section:"BACKEND",    label:"Hardening, Performance, Segurança",         bg:"#3b5bdb", start:9, end:10 },
  // WEB APP
  { section:"WEB APP",    label:"Setup frontend, Design system",             bg:"#7c3aed", start:1, end:2 },
  { section:"WEB APP",    label:"Auth, Dashboard",                           bg:"#7c3aed", start:2, end:3 },
  { section:"WEB APP",    label:"Projetos, Demandas",                        bg:"#7c3aed", start:3, end:4 },
  { section:"WEB APP",    label:"Plano inspeção, Execução web",              bg:"#7c3aed", start:4, end:5 },
  { section:"WEB APP",    label:"Revisão coord/RT",                          bg:"#7c3aed", start:5, end:6 },
  { section:"WEB APP",    label:"Documentos UI",                             bg:"#7c3aed", start:6, end:7 },
  { section:"WEB APP",    label:"UI assinatura (ICP)",                       bg:"#7c3aed", start:7, end:8 },
  { section:"WEB APP",    label:"Portal rastreabilidade",                    bg:"#7c3aed", start:8, end:9 },
  { section:"WEB APP",    label:"Refinos + UX",                              bg:"#7c3aed", start:9, end:10 },
  // MOBILE APP
  { section:"MOBILE APP", label:"Setup + Auth",                              bg:"#2f9e44", start:2, end:3 },
  { section:"MOBILE APP", label:"Download inspeções",                        bg:"#2f9e44", start:3, end:4 },
  { section:"MOBILE APP", label:"Estrutura offline",                         bg:"#2f9e44", start:4, end:5 },
  { section:"MOBILE APP", label:"Checklist offline, Autosave",               bg:"#2f9e44", start:5, end:6 },
  { section:"MOBILE APP", label:"Mídia (foto/vídeo)",                        bg:"#2f9e44", start:6, end:7 },
  { section:"MOBILE APP", label:"Sync",                                      bg:"#2f9e44", start:7, end:8 },
  { section:"MOBILE APP", label:"Retry + estabilidade",                      bg:"#2f9e44", start:8, end:9 },
  { section:"MOBILE APP", label:"Refinos + performance",                     bg:"#2f9e44", start:9, end:10 },
  // PORTAL CLIENTE
  { section:"PORTAL CLIENTE", label:"Setup",                                 bg:"#e67700", start:5, end:6 },
  { section:"PORTAL CLIENTE", label:"Visualização relatório",                bg:"#e67700", start:6, end:7 },
  { section:"PORTAL CLIENTE", label:"Aprovação/rejeição",                   bg:"#e67700", start:7, end:8 },
  { section:"PORTAL CLIENTE", label:"Comentários + histórico",               bg:"#e67700", start:8, end:9 },
  { section:"PORTAL CLIENTE", label:"Refinos",                               bg:"#e67700", start:9, end:10 },
  // PORTAL RASTREABILIDADE
  { section:"PORTAL RASTREAB.", label:"Setup",                               bg:"#0c8599", start:7, end:8 },
  { section:"PORTAL RASTREAB.", label:"Consulta + QR",                       bg:"#0c8599", start:8, end:9 },
  { section:"PORTAL RASTREAB.", label:"Visualização + logs",                  bg:"#0c8599", start:9, end:10 },
  // DEVOPS + QA
  { section:"DEVOPS + QA", label:"CI/CD, Infra base",                        bg:"#64748b", start:1, end:2 },
  { section:"DEVOPS + QA", label:"Testes iniciais",                          bg:"#64748b", start:2, end:3 },
  { section:"DEVOPS + QA", label:"Testes backend",                           bg:"#64748b", start:3, end:4 },
  { section:"DEVOPS + QA", label:"Testes web",                               bg:"#64748b", start:4, end:5 },
  { section:"DEVOPS + QA", label:"Testes execução",                          bg:"#64748b", start:5, end:6 },
  { section:"DEVOPS + QA", label:"Testes mobile",                            bg:"#64748b", start:6, end:7 },
  { section:"DEVOPS + QA", label:"Testes fluxo completo",                    bg:"#64748b", start:7, end:8 },
  { section:"DEVOPS + QA", label:"Testes ICP",                               bg:"#64748b", start:8, end:9 },
  { section:"DEVOPS + QA", label:"Go-live + monitoramento",                  bg:"#64748b", start:9, end:10 },
];

const roadmapSectionColors = {
  "BACKEND":         "#3b5bdb",
  "WEB APP":         "#7c3aed",
  "MOBILE APP":      "#2f9e44",
  "PORTAL CLIENTE":  "#e67700",
  "PORTAL RASTREAB.":"#0c8599",
  "DEVOPS + QA":     "#64748b",
};

// Milestones aligned to PDF (9 months)
const milestoneMarkers = [
  { m:5, label:"Dev M1–M5 concluído",   color:T.accent, desc:"Features principais prontas para QA" },
  { m:6, label:"Mobile + Portais",      color:T.green,  desc:"Mobile e portais em homologação" },
  { m:8, label:"ICP + Rastreabilidade", color:T.purple, desc:"ICP e auditoria integrados" },
  { m:9, label:"Go-live",               color:T.orange, desc:"Hardening, performance e produção" },
];

// Team — 1 designer line, both frontends from M1, 9 months
const teamGanttRows = [
  { section:"BACKEND",  label:"Backend Pleno #1",                         bg:"#3b5bdb", start:1, end:10 },
  { section:"BACKEND",  label:"Backend Pleno #2",                         bg:"#3b5bdb", start:1, end:10 },
  { section:"FRONTEND", label:"Frontend Web/Mobile Pleno #1",             bg:"#7c3aed", start:1, end:10 },
  { section:"FRONTEND", label:"Frontend Web/Mobile Pleno #2",             bg:"#7c3aed", start:1, end:10 },
  { section:"DESIGNER", label:"Product Designer (full → part)", bg:"#db2877", start:1, end:4, end2:7 },
  { section:"DEVOPS",   label:"DevOps + QA",                              bg:"#0c8599", start:1, end:10 },
  { section:"GESTÃO",   label:"Gestor de Projeto (part time)",            bg:"#e67700", start:1, end:10, part:true },
];

const teamSectionColors = {
  "BACKEND": "#3b5bdb", "FRONTEND":"#7c3aed", "DESIGNER":"#db2777",
  "DEVOPS":  "#0c8599", "GESTÃO":  "#e67700",
};

const teamSummary = [
  { role:"Backend Pleno",             qty:2, dedication:"Full time — M1 a M9", months:"M1–M9", color:T.accent,  detail:"Arquitetura, Auth, Workflow, ICP, Rastreabilidade, Hardening" },
  { role:"Frontend Web/Mobile Pleno", qty:2, dedication:"Full time — M1 a M9", months:"M1–M9", color:"#7c3aed", detail:"Web App completo (M1–M9) + React Native Mobile (M2–M9)" },
  { role:"Product Designer Pleno",    qty:1, dedication:"Full time M1–M3 / Part time M4–M6", months:"M1–M6", color:"#db2777", detail:"Discovery → Fluxos → Design System → Telas web → Mobile → Handoff → Portais" },
  { role:"Gestor de Projeto",         qty:1, dedication:"Part time (50%) — M1 a M9", months:"M1–M9", color:T.orange, detail:"Kickoff, planning, acompanhamento de milestones, go-live" },
  { role:"DevOps + QA",               qty:1, dedication:"Full time — M1 a M9", months:"M1–M9", color:T.teal,   detail:"CI/CD, Infra AWS, testes integrados, testes ICP, go-live e monitoramento" },
];

// ─── ATOMS ────────────────────────────────────────────────────────────────────
function Tag({ text, color }) {
  return <span style={{ background:color+"18", color, border:`1px solid ${color}30`, borderRadius:4, padding:"2px 8px", fontSize:11, fontWeight:600, display:"inline-block" }}>{text}</span>;
}
function Callout({ color, children }) {
  return <div style={{ background:color+"12", border:`1px solid ${color}30`, borderRadius:8, padding:"12px 16px", marginBottom:18, fontSize:13, color, lineHeight:1.7 }}>{children}</div>;
}
function SectionHead({ children }) {
  return <div style={{ fontSize:11, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1.2, marginBottom:14, marginTop:6, paddingBottom:8, borderBottom:`1px solid ${T.cardBorder}` }}>{children}</div>;
}
function StatCard({ label, value, color }) {
  return (
    <div style={{ background:T.card, border:`1px solid ${T.cardBorder}`, borderRadius:8, padding:"16px 20px", flex:1, minWidth:120, textAlign:"center" }}>
      <div style={{ fontSize:28, fontWeight:800, color:color||T.accent, lineHeight:1 }}>{value}</div>
      <div style={{ fontSize:12, color:T.textMuted, marginTop:6 }}>{label}</div>
    </div>
  );
}
function TableComp({ headers, rows }) {
  return (
    <div style={{ overflowX:"auto", borderRadius:8, border:`1px solid ${T.cardBorder}`, marginBottom:20 }}>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
        <thead><tr>{headers.map((h,j) => <th key={j} style={{ background:T.tableHead, color:T.textMuted, padding:"10px 14px", textAlign:"left", borderBottom:`1px solid ${T.cardBorder}`, fontWeight:700, fontSize:12, whiteSpace:"nowrap" }}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((row,j) => (
          <tr key={j} style={{ borderBottom:`1px solid ${T.rowBorder}`, background:j%2===0?"#fff":"#fafafa" }}>
            {row.map((cell,k) => <td key={k} style={{ padding:"10px 14px", color:k===0?T.text:T.textSub, fontWeight:k===0?600:400, fontSize:13 }}>{cell}</td>)}
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

// ─── GANTT BASE (shared by Roadmap and Team) ──────────────────────────────────
// ─── HTML GANTT ───────────────────────────────────────────────────────────────
function GanttBase({ featureRows, sectionColors, milestones }) {
  const months = [1,2,3,4,5,6,7,8,9];
  const totalCols = 9;
  const rows = [];
  let lastSection = null;
  featureRows.forEach(f => {
    if (f.section !== lastSection) { rows.push({ type:"section", label:f.section }); lastSection = f.section; }
    rows.push({ type:"feature", ...f });
  });

  return (
    <div style={{ background:T.card, border:`1px solid ${T.cardBorder}`, borderRadius:10, marginBottom:24, overflow:"hidden" }}>
      {/* Header */}
      <div style={{ display:"flex", borderBottom:`2px solid ${T.cardBorder}` }}>
        <div style={{ width:230, minWidth:230, flexShrink:0, borderRight:`1px solid ${T.cardBorder}`, padding:"10px 14px", background:T.tableHead }}>
          <span style={{ fontSize:11, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1 }}>Feature / Papel</span>
        </div>
        <div style={{ flex:1, display:"flex" }}>
          {months.map(m => {
            const ms = milestones ? milestones.find(mk => mk.m === m) : null;
            return (
              <div key={m} style={{ flex:1, textAlign:"center", padding:"7px 0 5px", background: ms ? ms.color+"16" : (m%2===0?"#f8f9fa":"#fff"), borderRight:`1px solid ${T.cardBorder}` }}>
                <div style={{ fontSize:13, fontWeight:800, color: ms ? ms.color : "#64748b", lineHeight:1 }}>M{m}</div>
                {ms && <div style={{ fontSize:9, fontWeight:700, color:ms.color, marginTop:2, lineHeight:1.2 }}>{ms.label.split(" ")[0]}</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Rows */}
      {rows.map((row, ri) => {
        if (row.type === "section") {
          const sc = sectionColors[row.label] || "#64748b";
          return (
            <div key={ri} style={{ display:"flex", background:sc+"10", borderBottom:`1px solid ${sc}25`, borderLeft:`4px solid ${sc}` }}>
              <div style={{ width:226, minWidth:226, flexShrink:0, padding:"7px 14px", borderRight:`1px solid ${T.cardBorder}` }}>
                <span style={{ fontSize:11, fontWeight:800, color:sc, textTransform:"uppercase", letterSpacing:0.8 }}>{row.label}</span>
              </div>
              <div style={{ flex:1, display:"flex" }}>
                {months.map(m => <div key={m} style={{ flex:1, borderRight:`1px solid ${T.cardBorder}` }} />)}
              </div>
            </div>
          );
        }

        // Feature row — clamp end to totalCols+1
        const start = Math.max(1, row.start);
        const end   = Math.min(totalCols + 1, row.end);

        return (
          <div key={ri} style={{ display:"flex", borderBottom:`1px solid ${T.rowBorder}`, background: ri%2===0?"#fff":"#fafafa", minHeight:38 }}>
            <div style={{ width:230, minWidth:230, flexShrink:0, padding:"0 14px", borderRight:`1px solid ${T.cardBorder}`, display:"flex", alignItems:"center" }}>
              <span style={{ fontSize:12, color:T.textSub, fontWeight:500, lineHeight:1.3 }}>{row.label}</span>
            </div>
            <div style={{ flex:1, position:"relative" }}>
              {/* column grid lines */}
              {months.map(m => (
                <div key={m} style={{ position:"absolute", left:`${((m-1)/totalCols)*100}%`, top:0, bottom:0, width:1, background:T.rowBorder }} />
              ))}
              { (() => {
                const s1 = Math.max(1, row.start);
                const e1 = Math.min(totalCols + 1, row.end);
                const hasSecond = !!row.end2;
                const e2 = hasSecond ? Math.min(totalCols + 1, row.end2) : null;

                return (
                  <>
                    {/* Segment 1 — full time (solid) */}
                    <div style={{
                      position:"absolute",
                      left:`calc(${((s1-1)/totalCols)*100}% + 3px)`,
                      width:`calc(${((e1-s1)/totalCols)*100}% - ${hasSecond ? 2 : 6}px)`,
                      top:6, bottom:6, borderRadius: hasSecond ? "5px 0 0 5px" : 5,
                      background: row.part ? "transparent" : row.bg,
                      border: row.part ? `2px dashed ${row.bg}` : "none",
                      opacity: row.part ? 0.7 : 0.88,
                      display:"flex", alignItems:"center", justifyContent:"center",
                    }}>
                      <span style={{ fontSize:11, fontWeight:700, color:"#fff", whiteSpace:"nowrap", padding:"0 4px" }}>
                        {hasSecond ? `M${s1}–M${e1-1} full` : (e1-s1>1 ? `M${s1}–M${e1-1}` : `M${s1}`)}
                      </span>
                    </div>
                    {/* Segment 2 — part time (dashed), only if end2 exists */}
                    {hasSecond && (
                      <div style={{
                        position:"absolute",
                        left:`calc(${((e1-1)/totalCols)*100}% + 1px)`,
                        width:`calc(${((e2-e1)/totalCols)*100}% - 4px)`,
                        top:6, bottom:6, borderRadius:"0 5px 5px 0",
                        background:"transparent",
                        border:`2px dashed ${row.bg}`,
                        opacity:0.75,
                        display:"flex", alignItems:"center", justifyContent:"center",
                      }}>
                        <span style={{ fontSize:11, fontWeight:700, color:row.bg, whiteSpace:"nowrap", padding:"0 4px" }}>
                          {`M${e1}–M${e2-1} part`}
                        </span>
                      </div>
                    )}
                  </>
                );
              })() }
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div style={{ display:"flex", gap:16, padding:"8px 14px", borderTop:`1px solid ${T.cardBorder}`, background:T.tableHead }}>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ width:24, height:10, borderRadius:3, background:"#64748b", opacity:0.85 }} />
          <span style={{ fontSize:11, color:T.textMuted }}>Full time</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ width:24, height:10, borderRadius:3, border:"2px dashed #64748b", opacity:0.6 }} />
          <span style={{ fontSize:11, color:T.textMuted }}>Part time</span>
        </div>
      </div>
    </div>
  );
}

// ─── PAGES ────────────────────────────────────────────────────────────────────
function PageOverview() {
  return (
    <div>
      <div style={{ display:"flex", gap:10, marginBottom:24, flexWrap:"wrap" }}>
        <StatCard label="Plataformas" value="4" color={T.accent} />
        <StatCard label="Prazo" value="9m" color={T.green} />
        <StatCard label="Perfis de Acesso" value="6" color={T.teal} />
        <StatCard label="Formulários FORs" value="9" color={T.purple} />
        <StatCard label="Tipos de Inspeção" value="3" color={T.orange} />
      </div>
      <Callout color={T.accent}><strong>Princípio central:</strong> no modelo atual, o código identifica o documento. No sistema, <strong>Código + Status + Versão = vida do documento.</strong> Codificação automática, versionamento imutável, evidência rastreável.</Callout>
      <SectionHead>Ecossistema de Sistemas</SectionHead>
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
        {systems.map(s => (
          <div key={s.id} style={{ background:T.card, border:`1px solid ${T.cardBorder}`, borderRadius:8, padding:"16px 20px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
              <div style={{ width:32, height:32, borderRadius:6, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:11, color:s.color }}>{s.abbr}</div>
              <div>
                <div style={{ fontWeight:700, fontSize:14, color:T.text }}>{s.label||s.label2}</div>
                <div style={{ fontSize:11, color:T.textMuted }}>{s.type}</div>
              </div>
              <div style={{ marginLeft:"auto", display:"flex", gap:5, flexWrap:"wrap" }}>{s.tags.map((t,i)=><Tag key={i} text={t} color={s.color}/>)}</div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px 32px" }}>
              {s.features.map((f,i)=><div key={i} style={{ fontSize:12, color:T.textSub, paddingLeft:12, borderLeft:`2px solid ${s.color}30`, lineHeight:1.5 }}>{f}</div>)}
            </div>
          </div>
        ))}
      </div>
      <SectionHead>Tipos de Inspeção Suportados</SectionHead>
      <TableComp headers={["Tipo","FOR-022 C/D","FOR-023","FOR-032","FOR-027","FOR-029","FOR-028","FOR-030","FOR-031"]} rows={[
        ["Projeto (PQ-12)","✓","✓","✓","—","✓ se NC","✓","✓","✓"],
        ["Obra (PQ-13)","✓","✓","✓","✓","✓ se NC","✓","✓","✓"],
        ["Operação (PQ-14)","✓","✓","✓","✓","✓ se NC","✓","✓","✓"],
      ]} />
    </div>
  );
}

function PageArchitecture() {
  const [sel, setSel] = useState(null);
  const selected = systems.find(s => s.id === sel);
  const toggle = id => setSel(sel===id?null:id);
  return (
    <div>
      <div style={{ fontSize:13, color:T.textMuted, marginBottom:20 }}>Clique em qualquer sistema para ver detalhes e funcionalidades</div>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:0, marginBottom:4 }}>
        <div onClick={()=>toggle("web")} style={{ width:360, background:T.card, border:`2px solid ${sel==="web"?T.accent:T.cardBorder}`, borderRadius:10, padding:"16px 18px", cursor:"pointer", transition:"all 0.15s", boxShadow:sel==="web"?`0 0 0 3px ${T.accent}20`:"none" }}
          onMouseEnter={e=>{if(sel!=="web")e.currentTarget.style.borderColor=T.accent+"80";}} onMouseLeave={e=>{if(sel!=="web")e.currentTarget.style.borderColor=T.cardBorder;}}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
            <div style={{ width:32, height:32, borderRadius:6, background:T.accentLight, fontWeight:800, fontSize:11, color:T.accent, display:"flex", alignItems:"center", justifyContent:"center" }}>WB</div>
            <div><div style={{ fontWeight:700, fontSize:14, color:T.text }}>Sistema Web</div><div style={{ fontSize:11, color:T.textMuted }}>Web · Sistema Unificado</div></div>
            <div style={{ marginLeft:"auto", fontSize:18, color:T.textMuted }}>{sel==="web"?"−":"+"}</div>
          </div>
          <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>{systems[0].tags.map((t,i)=><Tag key={i} text={t} color={T.accent}/>)}</div>
        </div>
        <div style={{ display:"flex", gap:100 }}>
          {["API","API"].map((a,i)=><div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center" }}><div style={{ width:1, height:20, background:T.cardBorder }}/><div style={{ fontSize:9, color:T.textMuted, background:T.card, border:`1px solid ${T.cardBorder}`, borderRadius:3, padding:"1px 5px" }}>{a}</div><div style={{ width:1, height:14, background:T.cardBorder }}/></div>)}
        </div>
        <div style={{ display:"flex", gap:10 }}>
          {systems.slice(1).map(s=>(
            <div key={s.id} onClick={()=>toggle(s.id)} style={{ width:185, background:T.card, border:`2px solid ${sel===s.id?s.color:T.cardBorder}`, borderRadius:10, padding:"14px 15px", cursor:"pointer", transition:"all 0.15s", boxShadow:sel===s.id?`0 0 0 3px ${s.color}20`:"none" }}
              onMouseEnter={e=>{if(sel!==s.id)e.currentTarget.style.borderColor=s.color+"80";}} onMouseLeave={e=>{if(sel!==s.id)e.currentTarget.style.borderColor=T.cardBorder;}}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                <div style={{ width:28, height:28, borderRadius:5, background:s.bg, fontWeight:800, fontSize:10, color:s.color, display:"flex", alignItems:"center", justifyContent:"center" }}>{s.abbr}</div>
                <div><div style={{ fontWeight:700, fontSize:12, color:T.text }}>{s.label||s.label2}</div><div style={{ fontSize:10, color:T.textMuted }}>{s.type}</div></div>
              </div>
              <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>{s.tags.map((t,i)=><Tag key={i} text={t} color={s.color}/>)}</div>
            </div>
          ))}
        </div>
      </div>
      {selected && (
        <div style={{ background:T.card, border:`1.5px solid ${selected.color}40`, borderRadius:10, padding:"18px 22px", marginTop:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
            <div style={{ width:36, height:36, borderRadius:8, background:selected.bg, fontWeight:800, fontSize:12, color:selected.color, display:"flex", alignItems:"center", justifyContent:"center" }}>{selected.abbr}</div>
            <div><div style={{ fontWeight:800, fontSize:15, color:T.text }}>{selected.label||selected.label2}</div><div style={{ fontSize:12, color:T.textMuted }}>{selected.type}</div></div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {selected.features.map((f,i)=><div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"8px 12px", background:selected.bg, borderRadius:6 }}><div style={{ width:6, height:6, borderRadius:"50%", background:selected.color, flexShrink:0, marginTop:5 }}/><span style={{ fontSize:13, color:T.textSub }}>{f}</span></div>)}
          </div>
        </div>
      )}
    </div>
  );
}

function PageRoles() {
  const [sel, setSel] = useState(null);
  return (
    <div>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:20 }}>
        {roles.map((r,i)=>(
          <button key={i} onClick={()=>setSel(sel===i?null:i)} style={{ display:"flex", alignItems:"center", gap:6, background:sel===i?r.bg:T.card, border:`1.5px solid ${sel===i?r.color:T.cardBorder}`, borderRadius:6, padding:"6px 12px", cursor:"pointer", transition:"all 0.1s" }}>
            <div style={{ width:20, height:20, borderRadius:4, background:r.color, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:9, fontWeight:800 }}>{r.abbr}</div>
            <span style={{ fontSize:12, fontWeight:700, color:T.text }}>{r.label}</span>
          </button>
        ))}
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {roles.map((r,i)=>(
          <div key={i} style={{ background:T.card, border:`1px solid ${sel===i?r.color+"50":T.cardBorder}`, borderRadius:8, padding:"14px 18px", opacity:sel!==null&&sel!==i?0.4:1, transition:"all 0.15s" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
              <div style={{ width:34, height:34, borderRadius:7, background:r.bg, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:11, color:r.color }}>{r.abbr}</div>
              <div><div style={{ fontWeight:700, fontSize:14, color:T.text }}>{r.label}</div><div style={{ fontSize:11, color:T.textMuted }}>{r.sub}</div></div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:r.restrictions.length?"1fr 1fr":"1fr", gap:16 }}>
              <div>
                <div style={{ fontSize:10, color:T.textMuted, fontWeight:700, marginBottom:8, textTransform:"uppercase", letterSpacing:0.8 }}>Permissões</div>
                {r.permissions.map((p,k)=><div key={k} style={{ fontSize:12, color:T.textSub, marginBottom:5, paddingLeft:10, borderLeft:`2px solid ${r.color}50`, lineHeight:1.5 }}>{p}</div>)}
              </div>
              {r.restrictions.length>0&&<div>
                <div style={{ fontSize:10, color:T.textMuted, fontWeight:700, marginBottom:8, textTransform:"uppercase", letterSpacing:0.8 }}>Restrições</div>
                {r.restrictions.map((p,k)=><div key={k} style={{ fontSize:12, color:T.red, marginBottom:5, paddingLeft:10, borderLeft:"2px solid #fca5a5", lineHeight:1.5 }}>{p}</div>)}
              </div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PageDocuments() {
  return (
    <div>
      <Callout color={T.accent}><strong>Cadeia documental inviolável:</strong> cada FOR só existe se o anterior foi concluído. FOR-030 não existe sem FOR-028 aprovado. FOR-031 não existe sem FOR-030 assinado. Dependências automáticas e invioláveis.</Callout>
      <SectionHead>Cadeia de Formulários</SectionHead>
      <div style={{ display:"flex", flexDirection:"column", gap:0, marginBottom:24 }}>
        {forDocs.map((d,i)=>(
          <div key={i} style={{ display:"flex", alignItems:"stretch", gap:0 }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginRight:12, width:20 }}>
              <div style={{ width:12, height:12, borderRadius:"50%", background:d.color, flexShrink:0, marginTop:10 }}/>
              {i<forDocs.length-1&&<div style={{ width:2, flex:1, background:T.cardBorder, minHeight:10 }}/>}
            </div>
            <div style={{ background:T.card, border:`1px solid ${T.cardBorder}`, borderRadius:7, padding:"10px 14px", flex:1, display:"flex", alignItems:"center", gap:12, marginBottom:5 }}>
              <div style={{ minWidth:92 }}><Tag text={d.code} color={d.color}/></div>
              <div style={{ flex:1, fontWeight:600, fontSize:13, color:T.text }}>{d.name}</div>
              <div style={{ fontSize:12, color:T.textMuted, minWidth:170, textAlign:"right" }}>{d.who}</div>
              <div style={{ display:"flex", gap:4 }}>{d.tipo.map((t,k)=><Tag key={k} text={t} color={T.textMuted}/>)}</div>
            </div>
          </div>
        ))}
      </div>
      <SectionHead>Fluxo End-to-End — 12 Etapas</SectionHead>
      <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
        {workflowSteps.map((step,i)=>(
          <div key={i} style={{ display:"flex", alignItems:"stretch", gap:0 }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginRight:12, width:24 }}>
              <div style={{ width:24, height:24, borderRadius:"50%", background:step.color+"18", border:`2px solid ${step.color}50`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:800, color:step.color, flexShrink:0 }}>{step.num}</div>
              {i<workflowSteps.length-1&&<div style={{ width:2, flex:1, background:T.cardBorder, minHeight:8 }}/>}
            </div>
            <div style={{ background:T.card, border:`1px solid ${T.cardBorder}`, borderRadius:7, padding:"10px 14px", marginBottom:4, flex:1 }}>
              <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:4, flexWrap:"wrap" }}>
                <Tag text={step.actor} color={step.color}/>
                <span style={{ fontSize:13, color:T.text, fontWeight:600 }}>{step.action}</span>
                <span style={{ marginLeft:"auto", fontSize:10, color:T.textMuted, background:T.bg, borderRadius:4, padding:"2px 7px", border:`1px solid ${T.cardBorder}`, whiteSpace:"nowrap" }}>{step.state}</span>
              </div>
              <div style={{ fontSize:12, color:T.textMuted, lineHeight:1.6 }}>{step.detail}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop:24 }}>
        <SectionHead>Máquina de Estados</SectionHead>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
          {states.map((s,i)=>(
            <div key={i} style={{ background:T.card, border:`1px solid ${T.cardBorder}`, borderRadius:8, padding:"12px 14px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:s.color, flexShrink:0 }}/>
                <span style={{ fontWeight:700, fontSize:11, color:s.color }}>{s.label}</span>
              </div>
              <p style={{ fontSize:12, color:T.textSub, marginBottom:6, lineHeight:1.5 }}>{s.desc}</p>
              {s.triggers.map((t,k)=><div key={k} style={{ fontSize:11, color:T.textMuted, fontStyle:"italic" }}>→ {t}</div>)}
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop:24 }}>
        <SectionHead>Tratamento de Não Conformidades (FOR-029)</SectionHead>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
          {[{title:"Geração automática",desc:"Criado quando inspetor marca item como NC. Sempre vinculado ao item e evidência — nunca isolado.",color:T.red},{title:"Enviado ao cliente",desc:"Anexado ao FOR-028. Cliente preenche tratativas (ações corretivas) — não aprova nem rejeita.",color:T.orange},{title:"Libera FOR-030",desc:"Sistema só gera Relatório Final após todas as tratativas do FOR-029 respondidas. Bloqueio inviolável.",color:T.green}].map((item,i)=>(
            <div key={i} style={{ background:T.card, border:`1px solid ${T.cardBorder}`, borderRadius:8, padding:"14px 16px" }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:item.color, marginBottom:8 }}/>
              <div style={{ fontWeight:700, fontSize:13, color:T.text, marginBottom:6 }}>{item.title}</div>
              <div style={{ fontSize:12, color:T.textSub, lineHeight:1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PageCodification() {
  const parts=[{part:"EPR",label:"Cliente",color:T.accent},{part:"RP",label:"Tipo doc.",color:T.purple},{part:"0012025",label:"Proposta",color:T.green},{part:"5532025",label:"OS",color:T.teal},{part:"02",label:"Sequencial",color:T.orange},{part:"DRE",label:"Disciplina",color:T.red},{part:"V01",label:"Versão",color:"#6741d9"}];
  return (
    <div>
      <Callout color={T.accent}><strong>Regra fundamental:</strong> o usuário nunca digita o código. O sistema monta automaticamente. Estrutura: <strong>CLIENTE – TIPO – PROPOSTA – OS – SEQ – DISCIPLINA – VERSÃO</strong></Callout>
      <SectionHead>Exemplo Real Desmontado</SectionHead>
      <div style={{ background:"#1e293b", borderRadius:8, padding:"14px 20px", marginBottom:14, fontFamily:"monospace", fontSize:18, fontWeight:700, color:"#f8fafc", letterSpacing:2, textAlign:"center" }}>EPR-RP-0012025-5532025-02-DRE-V01</div>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:24 }}>
        {parts.map((p,i)=><div key={i} style={{ background:p.color+"12", border:`1.5px solid ${p.color}40`, borderRadius:8, padding:"10px 14px", textAlign:"center" }}><div style={{ fontFamily:"monospace", fontWeight:800, fontSize:14, color:p.color }}>{p.part}</div><div style={{ fontSize:10, color:T.textMuted, marginTop:3 }}>{p.label}</div></div>)}
      </div>
      <SectionHead>Origem de Cada Campo</SectionHead>
      <TableComp headers={["Campo","Origem","Exemplo","Regra"]} rows={[
        ["CLIENTE","Cadastro do cliente","EPR","Sigla definida no cadastro — nunca digitada"],
        ["TIPO","Tipo de documento selecionado","RP","CL, RV, RP, RN, RF, CI — selecionado, nunca digitado"],
        ["PROPOSTA","Nº da proposta do projeto","0012025","Herdado automaticamente do processo"],
        ["OS","Ordem de Serviço","5532025","Herdado automaticamente — base da rastreabilidade"],
        ["SEQ","Sequencial por tipo + disciplina","02","Incremento automático — evita duplicidade"],
        ["DISCIPLINA","Especialidade do inspetor","DRE","Vinculado ao inspetor — nunca digitado"],
        ["VERSÃO","Versionamento automático","V01","V00 = primeiro envio, incrementa a cada revisão"],
      ]}/>
      <SectionHead>Controle de Versão</SectionHead>
      <div style={{ display:"flex", gap:10, marginBottom:24, flexWrap:"wrap" }}>
        {[["V00","Primeiro envio","#64748b"],["V01","Ajuste Coordenador",T.purple],["V02","Ajuste Cliente",T.orange],["V03+","Resubmissões",T.red]].map(([v,l,c],i)=>(
          <div key={i} style={{ flex:1, background:T.card, border:`1px solid ${T.cardBorder}`, borderRadius:8, padding:"14px", textAlign:"center", minWidth:120 }}>
            <div style={{ fontFamily:"monospace", fontSize:20, fontWeight:800, color:c }}>{v}</div>
            <div style={{ fontSize:12, color:T.textMuted, marginTop:6 }}>{l}</div>
          </div>
        ))}
      </div>
      <SectionHead>Status do Documento</SectionHead>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
        {[["Rascunho","Editável por quem criou. Código já gerado.","#64748b"],["Submetido","Travado para o inspetor. Aguarda revisão.",T.accent],["Em Revisão","Editável apenas por Coord. ou RT.",T.orange],["Aprovado","Somente leitura. Pronto para próxima etapa.",T.green],["Assinado","Bloqueado e imutável. Hash SHA-256 registrado.",T.purple],["Retificado","Versão anterior arquivada. Nova versão criada.",T.teal]].map(([s,d,c],i)=>(
          <div key={i} style={{ background:T.card, border:`1px solid ${T.cardBorder}`, borderRadius:7, padding:"12px 14px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}><div style={{ width:7, height:7, borderRadius:"50%", background:c }}/><span style={{ fontWeight:700, fontSize:13, color:T.text }}>{s}</span></div>
            <div style={{ fontSize:11, color:T.textMuted, lineHeight:1.5 }}>{d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PageSignatures() {
  return (
    <div>
      <Callout color={T.teal}><strong>Dois regimes distintos:</strong> logs sistêmicos autenticados (fluxo interno) e assinaturas digitais ICP-Brasil (validade jurídica). O regime ICP só é acionado após aprovação do cliente no FOR-028 + tratativas do FOR-029 respondidas.</Callout>
      <SectionHead>Regime 1 — Logs Sistêmicos (Fluxo Interno)</SectionHead>
      <TableComp headers={["Formulário","Nome","Quem assina","Momento"]} rows={[
        ["FOR-022 C","Análise Crítica de Contratos","Responsável Técnico","Pré-execução"],
        ["FOR-022 D","Análise de Completeza da Doc.","Coordenador","Pré-execução"],
        ["FOR-023","Plano de Inspeção","RT → Coord → Inspetores → Cliente","Antes da execução"],
        ["FOR-027","Relatório de Visita","Inspetor + Responsável Obra","Durante execução (Obra/Operação)"],
        ["FOR-028","Relatório Parcial","RT + Coordenador + Inspetores","Log sistêmico após validação RT"],
        ["FOR-029","Não Conformidade","RT + Coordenador + Inspetor","Log sistêmico quando NC identificada"],
      ]}/>
      <SectionHead>Regime 2 — Assinaturas ICP-Brasil (Pós-Aprovação do Cliente)</SectionHead>
      <Callout color={T.accent}><strong>Gatilho:</strong> aprovação do FOR-028 <strong>E</strong> preenchimento das tratativas do FOR-029. Ambas obrigatórias. Ordem fixa e inviolável.</Callout>
      <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
        {[{level:"ICP 1..N",name:"Todos os Inspetores (em paralelo)",actor:"Inspetores",type:"ICP-Brasil",desc:"Cada inspetor assina FOR-030 pela sua especialidade. Sistema libera todos simultaneamente."},{level:"ICP N+1",name:"Coordenador",actor:"Coordenador",type:"ICP-Brasil",desc:"Assina FOR-030 após todos os inspetores. Responsabilidade pela condução do processo."},{level:"ICP N+2",name:"Responsável Técnico",actor:"RT",type:"ICP-Brasil",desc:"Assina FOR-030 e FOR-031. Validade técnica e legal ao laudo e certificado."},{level:"ICP N+3",name:"Cliente / Contratante",actor:"Cliente",type:"ICP-Brasil",desc:"Assinatura final. Validade jurídica plena."}].map((sig,j)=>(
          <div key={j} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
            <div style={{ width:44, height:36, borderRadius:7, background:T.accentLight, color:T.accent, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:800, flexShrink:0, textAlign:"center" }}>{sig.level}</div>
            <div style={{ background:T.card, border:`1px solid ${T.cardBorder}`, borderRadius:7, padding:"10px 14px", flex:1 }}>
              <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:5, flexWrap:"wrap" }}>
                <span style={{ fontWeight:700, fontSize:13, color:T.text }}>{sig.name}</span>
                <Tag text={sig.actor} color={T.accent}/>
                <Tag text={sig.type} color={T.green}/>
              </div>
              <p style={{ fontSize:12, color:T.textMuted, lineHeight:1.6 }}>{sig.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <SectionHead>Integridade e Log de Auditoria</SectionHead>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        {[["Hash SHA-256","Qualquer alteração invalida automaticamente a assinatura.",T.accent],["Timestamp NTP","Registrado via servidor confiável. Não pode ser alterado retroativamente.",T.teal],["Log imutável","Trilha separada do documento: quem, quando, o quê e qual versão.",T.green],["Recibo por e-mail","Cada signatário recebe confirmação com recibo e hash do documento assinado.",T.purple]].map(([t,d,c],i)=>(
          <div key={i} style={{ background:T.card, border:`1px solid ${T.cardBorder}`, borderRadius:8, padding:"12px 14px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}><div style={{ width:7, height:7, borderRadius:"50%", background:c }}/><span style={{ fontWeight:700, fontSize:13, color:T.text }}>{t}</span></div>
            <div style={{ fontSize:12, color:T.textMuted, lineHeight:1.5 }}>{d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PageTraceability() {
  return (
    <div>
      <Callout color={T.teal}><strong>Somente leitura</strong> — repositório imutável separado do banco operacional. Nenhuma API de escrita exposta. Adulteração detectada pela divergência de hash SHA-256.</Callout>
      <div style={{ display:"flex", gap:10, marginBottom:24, flexWrap:"wrap" }}>
        {[{label:"QR Code único",desc:"Impresso no FOR-031. Verificação pública por qualquer pessoa com o link.",color:T.accent},{label:"Tabela de rastreabilidade",desc:"Todos os FORs gerados, versões, signatários e datas — equivalente a tabela de diploma.",color:T.green},{label:"Hash SHA-256",desc:"Integridade de cada documento verificável em tempo real.",color:T.teal},{label:"Linha do tempo",desc:"Cada evento da inspeção com timestamp imutável e actor registrado.",color:T.purple}].map((item,i)=>(
          <div key={i} style={{ background:T.card, border:`1px solid ${T.cardBorder}`, borderRadius:8, padding:"14px 16px", flex:1, minWidth:160 }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:item.color, marginBottom:8 }}/>
            <div style={{ fontWeight:700, fontSize:13, color:T.text, marginBottom:4 }}>{item.label}</div>
            <div style={{ fontSize:12, color:T.textMuted, lineHeight:1.5 }}>{item.desc}</div>
          </div>
        ))}
      </div>
      <SectionHead>Conteúdo por Nível de Acesso</SectionHead>
      <TableComp headers={["Informação","Acesso Público (QR/link)","Acesso Auditor Credenciado"]} rows={[
        ["Status e número do FOR-031","✓","✓"],["Tabela de rastreabilidade dos FORs","✓","✓"],["Identidade dos signatários ICP-Brasil","✓","✓"],["Hash de integridade","✓","✓"],["FOR-030 e FOR-031 completos","—","✓"],["FOR-028 e histórico de versões","—","✓"],["FOR-029 e tratativas do cliente","—","✓"],["FOR-032 com evidências por especialidade","—","✓"],["FOR-027 com fotos e GPS","—","✓"],["Log de auditoria completo","—","✓"],["Painel regulatório agregado","—","✓"],
      ]}/>
    </div>
  );
}

function PageRoadmap() {
  return (
    <div>
      {/* Milestone cards */}
      <div style={{ display:"flex", gap:10, marginBottom:20, flexWrap:"wrap" }}>
        {milestoneMarkers.map((m,i) => (
          <div key={i} style={{ background:T.card, border:`1.5px solid ${m.color}40`, borderRadius:8, padding:"14px 18px", flex:1, minWidth:160 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:m.color }} />
              <Tag text={`M${m.m}`} color={m.color} />
            </div>
            <div style={{ fontWeight:700, fontSize:15, color:T.text, marginBottom:3 }}>{m.label}</div>
            <div style={{ fontSize:12, color:T.textMuted }}>{m.desc}</div>
          </div>
        ))}
      </div>
      {/* Legend */}
      <div style={{ display:"flex", gap:12, marginBottom:12, flexWrap:"wrap" }}>
        {Object.entries(roadmapSectionColors).map(([l,c]) => (
          <div key={l} style={{ display:"flex", alignItems:"center", gap:5 }}>
            <div style={{ width:14, height:9, borderRadius:2, background:c }} />
            <span style={{ fontSize:11, color:T.textMuted, fontWeight:500 }}>{l}</span>
          </div>
        ))}
      </div>
      <GanttBase featureRows={ganttFeatures} sectionColors={roadmapSectionColors} milestones={milestoneMarkers} />
    </div>
  );
}

function PageTeam() {
  return (
    <div>
      {/* Stat cards */}
      <div style={{ display:"flex", gap:10, marginBottom:24, flexWrap:"wrap" }}>
        <StatCard label="Pessoas no time" value="7" color={T.accent} />
        <StatCard label="Papéis distintos" value="5" color={T.green} />
        <StatCard label="Meses de projeto" value="9" color={T.teal} />
        <StatCard label="Full time" value="5" color={T.purple} />
        <StatCard label="Part time" value="2" color={T.orange} />
      </div>
      {/* Legend */}
      <div style={{ display:"flex", gap:12, marginBottom:12, flexWrap:"wrap" }}>
        {Object.entries(teamSectionColors).map(([l,c]) => (
          <div key={l} style={{ display:"flex", alignItems:"center", gap:5 }}>
            <div style={{ width:14, height:9, borderRadius:2, background:c }} />
            <span style={{ fontSize:11, color:T.textMuted, fontWeight:500 }}>{l}</span>
          </div>
        ))}
      </div>
      <GanttBase featureRows={teamGanttRows} sectionColors={teamSectionColors} milestones={null} />
      <SectionHead>Detalhamento por Papel</SectionHead>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {teamSummary.map((row,i) => (
          <div key={i} style={{ background:T.card, border:`1px solid ${T.cardBorder}`, borderRadius:8, padding:"14px 18px", display:"flex", alignItems:"center", gap:16 }}>
            <div style={{ width:9, height:9, borderRadius:"50%", background:row.color, flexShrink:0 }} />
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700, fontSize:14, color:T.text }}>{row.role}</div>
              <div style={{ fontSize:12, color:T.textMuted, marginTop:2 }}>{row.detail}</div>
            </div>
            <div style={{ textAlign:"center", minWidth:32 }}>
              <div style={{ fontSize:22, fontWeight:800, color:row.color }}>{row.qty}</div>
              <div style={{ fontSize:10, color:T.textMuted }}>pessoa{row.qty>1?"s":""}</div>
            </div>
            <div style={{ textAlign:"right", minWidth:160 }}>
              <Tag text={row.months} color={row.color} />
              <div style={{ fontSize:11, color:T.textMuted, marginTop:4 }}>{row.dedication}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PageEstimates() {
  const [open, setOpen] = useState(null);
  const total = estApps.reduce((a,b)=>a+b.hours,0);
  const max = Math.max(...estApps.map(i=>i.hours));
  return (
    <div>
      <div style={{ display:"flex", gap:10, marginBottom:24, flexWrap:"wrap" }}>
        {[{label:"Horas sem margem",value:"3.970h",color:T.accent},{label:"Margem (25%)",value:"≈ 992h",color:T.orange},{label:"Total com margem",value:"≈ 4.962h",color:T.green,big:true}].map((item,i)=>(
          <div key={i} style={{ background:T.card, border:`1.5px solid ${item.color}30`, borderRadius:10, padding:"18px 22px", flex:1, minWidth:150, textAlign:"center" }}>
            <div style={{ fontSize:item.big?26:22, fontWeight:800, color:item.color }}>{item.value}</div>
            <div style={{ fontSize:11, color:T.textMuted, marginTop:6 }}>{item.label}</div>
          </div>
        ))}
      </div>
      <SectionHead>Horas por Aplicação</SectionHead>
      <div style={{ marginBottom:20 }}>
        {estApps.map((item,i)=>(
          <div key={i} style={{ marginBottom:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
              <span style={{ fontSize:13, color:T.text, fontWeight:600 }}>{item.label}</span>
              <span style={{ fontSize:13, color:item.color, fontWeight:700 }}>{item.hours.toLocaleString()}h <span style={{ color:T.textMuted, fontWeight:400 }}>({Math.round(item.hours/total*100)}%)</span></span>
            </div>
            <div style={{ background:T.rowBorder, borderRadius:6, height:8 }}><div style={{ width:`${item.hours/max*100}%`, height:"100%", background:item.color, borderRadius:6 }}/></div>
          </div>
        ))}
      </div>
      <SectionHead>Detalhamento por Aplicação</SectionHead>
      {estApps.map((app,i)=>{
        const appTotal=app.items.reduce((a,b)=>a+b.h,0); const isOpen=open===i;
        return (
          <div key={i} style={{ background:T.card, border:`1.5px solid ${app.color}25`, borderRadius:10, marginBottom:8, overflow:"hidden" }}>
            <button onClick={()=>setOpen(isOpen?null:i)} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", background:"none", border:"none", cursor:"pointer" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}><div style={{ width:8, height:8, borderRadius:"50%", background:app.color }}/><span style={{ fontSize:13, fontWeight:700, color:T.text }}>{app.label}</span></div>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}><span style={{ fontSize:13, fontWeight:700, color:app.color }}>{appTotal.toLocaleString()}h</span><span style={{ fontSize:11, color:T.textMuted }}>{isOpen?"▲":"▼"}</span></div>
            </button>
            {isOpen&&<div style={{ borderTop:`1px solid ${T.cardBorder}`, padding:"10px 16px 14px" }}>
              {app.items.map((item,j)=>(
                <div key={j} style={{ marginBottom:8 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}><span style={{ fontSize:12, color:T.textSub }}>{item.n}</span><span style={{ fontSize:12, fontWeight:600, color:T.text }}>{item.h}h</span></div>
                  <div style={{ background:T.rowBorder, borderRadius:4, height:5 }}><div style={{ width:`${Math.round(item.h/appTotal*100)}%`, height:"100%", background:app.color+"70", borderRadius:4 }}/></div>
                </div>
              ))}
            </div>}
          </div>
        );
      })}
    </div>
  );
}

function PageScenario() {
  const steps=[
    {day:"Dia 1",actor:"Gestora (Carla)",color:T.purple,actions:["Cria INS-2024-0891, tipo Obra (PQ-13)","Upload: OS-5532025, Contrato, Proposta EPR-0012025, Edital, PER","4 inspetores concomitantes: Carlos (GEO), Ana P. (TER), Murilo (DRE), Jael (PAV)","Solicita ARTs — sistema gera FOR-022 C (RT) e FOR-022 D (Coord.) automaticamente"]},
    {day:"Dia 1 tarde",actor:"RT + Coordenador",color:T.teal,actions:["RT preenche e assina FOR-022 C: contrato viável, equipe adequada","Coordenador preenche e assina FOR-022 D: documentação completa"]},
    {day:"Dia 2",actor:"Coordenador (Ana)",color:T.green,actions:["Seleciona boneca 'Inspeção de Obra Estrutural', personaliza por especialidade","Cria FOR-023 — EPR-PI-0012025-5532025-01-V00","Enviado para assinatura: RT → Coord. → 4 Inspetores → Cliente"]},
    {day:"Dia 2 tarde",actor:"Cliente (BetaBuild)",color:T.orange,actions:["Revisa escopo e equipe no portal","Assina FOR-023 — inspetores liberados concomitantemente"]},
    {day:"Dias 3–4",actor:"4 Inspetores (paralelo)",color:T.orange,actions:["Carlos (GEO): FOR-032 + FOR-027, 12 itens, 8 fotos — EPR-CL-...-GEO-V00","Ana P. (TER) + Jael (PAV): FOR-032 + FOR-027","Murilo (DRE): NC detectada → FOR-029 gerado — EPR-RN-...-DRE-V00","Todos submetem → Coordenador notificado"]},
    {day:"Dia 5",actor:"Coordenador (Ana)",color:T.green,actions:["Rejeita FOR-027 de Carlos: foto desfocada","Carlos resubmete → sistema cria V01","Aprova todos → assina FOR-028 — EPR-RP-...-V00"]},
    {day:"Dia 5 tarde",actor:"RT (Dr. Marcos)",color:T.teal,actions:["Emite parecer técnico consolidado","Assina FOR-028 e FOR-029"]},
    {day:"Dia 6",actor:"Cliente (BetaBuild)",color:T.orange,actions:["Recebe FOR-028 para aprovar + FOR-029 para responder","Preenche tratativas no FOR-029: 'Correção pela empresa X em 30 dias'","Solicita ajuste no FOR-028: incluir prazo no parecer"]},
    {day:"Dia 7",actor:"Coord. + RT",color:T.teal,actions:["RT atualiza parecer com prazo de 6 meses","Sistema gera EPR-RP-...-V01","Coord. e RT assinam V01 → enviado ao cliente"]},
    {day:"Dia 8",actor:"Cliente (BetaBuild)",color:T.orange,actions:["Aprova FOR-028 V01 e confirma tratativas do FOR-029","Gatilho ICP-Brasil disparado automaticamente"]},
    {day:"Dia 8 ICP",actor:"Todos os Signatários",color:T.accent,actions:["Carlos, Ana P., Murilo e Jael assinam FOR-030 via ICP (paralelo)","Coordenador Ana assina FOR-030 via ICP","RT Dr. Marcos assina FOR-030 e FOR-031 via ICP","BetaBuild assina FOR-030 e FOR-031 via ICP","FOR-031 emitido: EPR-CI-0012025-5532025-01-V00 com QR Code","Tabela de rastreabilidade publicada — 9 FORs vinculados"]},
  ];
  return (
    <div>
      <div style={{ background:T.accentLight, border:`1px solid ${T.accent}30`, borderRadius:8, padding:"12px 16px", marginBottom:20, fontSize:13, color:T.accent }}>
        <strong>INS-2024-0891</strong> · Inspeção de Obra (PQ-13) · Torre Alpha · 4 inspetores concomitantes · 8 dias · 9 FORs · 7 assinaturas ICP-Brasil
      </div>
      {steps.map((step,i)=>(
        <div key={i} style={{ display:"flex", gap:12, marginBottom:12 }}>
          <div style={{ minWidth:88, textAlign:"right", paddingTop:2 }}><Tag text={step.day} color={step.color}/></div>
          <div style={{ borderLeft:`2px solid ${T.cardBorder}`, paddingLeft:14, flex:1 }}>
            <div style={{ fontSize:13, color:T.text, fontWeight:700, marginBottom:6 }}>{step.actor}</div>
            {step.actions.map((a,k)=><div key={k} style={{ fontSize:12, color:T.textSub, marginBottom:4, paddingLeft:10, borderLeft:`2px solid ${T.cardBorder}`, lineHeight:1.6 }}>• {a}</div>)}
          </div>
        </div>
      ))}
      <div style={{ background:T.greenLight, border:`1px solid ${T.green}30`, borderRadius:8, padding:"14px 16px", marginTop:12, fontSize:13, color:T.green, lineHeight:1.8 }}>
        <strong>Resultado:</strong> INS-2024-0891 concluída em 8 dias. 4 inspetores concomitantes. 1 NC (FOR-029 com tratativa). 1 rejeição interna + 1 ciclo de revisão no FOR-028. 9 formulários com código automático. FOR-031 com 7 assinaturas ICP-Brasil. QR Code publicado.
      </div>
    </div>
  );
}

// ─── PAGE REGISTRY ────────────────────────────────────────────────────────────
const pages = {
  overview:     { title:"Visão Geral",         sub:"Houer · Sistema de Gestão de Inspeções",        component:PageOverview },
  architecture: { title:"Arquitetura",          sub:"Sistemas e fluxos do produto",                  component:PageArchitecture },
  roles:        { title:"Papéis e Acessos",     sub:"Permissões e restrições por perfil",            component:PageRoles },
  documents:    { title:"Documentos & Fluxo",   sub:"FORs · Fluxo End-to-End · Máquina de Estados", component:PageDocuments },
  codification: { title:"Codificação",          sub:"Código automático · Versão · Status",           component:PageCodification },
  signatures:   { title:"Assinaturas",          sub:"Logs sistêmicos + ICP-Brasil",                  component:PageSignatures },
  traceability: { title:"Rastreabilidade",      sub:"QR Code · Auditores · INMETRO · ANTT",          component:PageTraceability },
  roadmap:      { title:"Roadmap",              sub:"Feature por feature · 9 meses · Marcos",        component:PageRoadmap },
  team:         { title:"Equipe",               sub:"Composição · Dedicação · Alocação por mês",     component:PageTeam },
  estimates:    { title:"Estimativas",          sub:"Horas por aplicação · Total com margem",        component:PageEstimates },
  scenario:     { title:"Cenário de Exemplo",   sub:"INS-2024-0891 · Torre Alpha · PQ-13",           component:PageScenario },
};

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function TelaLogin({ onLogin }) {
  const [input, setInput] = useState("");
  const [erro, setErro] = useState(false);
  const tentar = () => { if(input===SENHA){onLogin();}else{setErro(true);setInput("");setTimeout(()=>setErro(false),2000);} };
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", background:T.bg, fontFamily:"system-ui, sans-serif" }}>
      <div style={{ background:T.card, border:`1px solid ${T.cardBorder}`, borderRadius:12, padding:"40px 36px", width:340, boxShadow:"0 4px 20px rgba(0,0,0,0.08)", textAlign:"center" }}>
        <div style={{ width:40, height:40, borderRadius:10, background:T.accentLight, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", fontSize:18 }}>🔒</div>
        <div style={{ fontSize:10, color:T.accent, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", marginBottom:6 }}>Acesso Restrito</div>
        <div style={{ fontSize:17, color:T.text, fontWeight:800, marginBottom:4 }}>Houer · Gestão de Inspeções</div>
        <div style={{ fontSize:12, color:T.textMuted, marginBottom:28 }}>Documentação Técnica de Produto v4.1</div>
        <input type="password" placeholder="Senha de acesso" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&tentar()}
          style={{ width:"100%", padding:"10px 14px", fontSize:13, borderRadius:7, border:`1.5px solid ${erro?"#ef4444":T.cardBorder}`, outline:"none", boxSizing:"border-box", background:erro?"#fff5f5":"#f8f9fa", color:T.text, marginBottom:10 }}/>
        {erro&&<div style={{ fontSize:12, color:T.red, marginBottom:10, fontWeight:600 }}>Senha incorreta.</div>}
        <button onClick={tentar} style={{ width:"100%", padding:"10px", fontSize:13, fontWeight:700, background:T.accent, color:"#fff", border:"none", borderRadius:7, cursor:"pointer" }}>Entrar</button>
        <div style={{ fontSize:11, color:T.textMuted, marginTop:20 }}>Houer © 2025 · Uso interno</div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [logado, setLogado] = useState(false);
  const [active, setActive] = useState("overview");
  if (!logado) return <TelaLogin onLogin={()=>setLogado(true)}/>;
  const page = pages[active];
  const PageComponent = page.component;
  return (
    <div style={{ display:"flex", height:"100vh", background:T.bg, fontFamily:"system-ui, -apple-system, sans-serif", color:T.text, overflow:"hidden" }}>
      <div style={{ width:200, flexShrink:0, background:T.sidebar, borderRight:`1px solid ${T.sidebarBorder}`, overflowY:"auto", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"16px 16px 12px", borderBottom:`1px solid ${T.sidebarBorder}`, display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:28, height:28, borderRadius:7, background:T.accent, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:13 }}>H</div>
          <span style={{ fontSize:14, fontWeight:800, color:T.text }}>Houer</span>
          <div style={{ marginLeft:"auto", background:T.tableHead, border:`1px solid ${T.cardBorder}`, borderRadius:4, padding:"1px 6px", fontSize:10, fontWeight:700, color:T.textMuted }}>MVP</div>
        </div>
        <nav style={{ flex:1, padding:"10px 0" }}>
          {navItems.map((group,gi)=>(
            <div key={gi} style={{ marginBottom:8 }}>
              <div style={{ fontSize:10, fontWeight:700, color:T.textMuted, letterSpacing:1.2, padding:"6px 16px 4px", textTransform:"uppercase" }}>{group.group}</div>
              {group.items.map(item=>(
                <button key={item.id} onClick={()=>setActive(item.id)} style={{ display:"flex", alignItems:"center", gap:8, width:"100%", textAlign:"left", padding:"7px 16px", fontSize:13, fontWeight:active===item.id?700:400, color:active===item.id?T.accent:T.textSub, background:active===item.id?T.accentLight:"transparent", border:"none", borderLeft:active===item.id?`2px solid ${T.accent}`:"2px solid transparent", cursor:"pointer", transition:"all 0.1s" }}>
                  <span style={{ fontSize:11, opacity:0.55 }}>{item.icon}</span>{item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div style={{ padding:"10px 14px", borderTop:`1px solid ${T.sidebarBorder}` }}>
          <div style={{ fontSize:11, color:T.textMuted, textAlign:"center" }}>Houer © 2025 · Uso interno</div>
        </div>
      </div>
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        <div style={{ background:T.card, borderBottom:`1px solid ${T.cardBorder}`, padding:"0 28px", height:46, display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
          <span style={{ fontSize:14, fontWeight:700, color:T.text }}>{page.title}</span>
          <span style={{ color:T.textMuted, fontSize:13 }}>/</span>
          <span style={{ fontSize:13, color:T.textMuted }}>{page.sub}</span>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"24px 28px" }}>
          <PageComponent/>
        </div>
      </div>
    </div>
  );
}
