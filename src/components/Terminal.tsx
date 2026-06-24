"use client";

import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from "react";
import { ROOT, INITIAL_PATH, type FsNode, type FsDir, type FsFile } from "@/data/filesystem";

type OutputLine = {
  type: "input" | "output" | "error" | "system" | "ascii";
  text: string;
};

export function Terminal() {
  const [currentPath, setCurrentPath] = useState<string[]>([...INITIAL_PATH]);
  const [output, setOutput] = useState<OutputLine[]>([
    { type: "system", text: "GR.OS Terminal v3.2.1" },
    { type: "system", text: "Digite 'help' para comandos disponiveis." },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [cursorPos, setCursorPos] = useState(0);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showHelp, setShowHelp] = useState(false);

  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  const helpTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    promptRef.current?.scrollIntoView({ block: "end" });
  }, [output, inputValue]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  function getNodeAtPath(path: string[]): FsNode | null {
    let current: FsDir = ROOT;
    for (let i = 1; i < path.length; i++) {
      if (!(path[i] in current.children)) return null;
      const child: FsDir | FsFile = current.children[path[i]];
      if (child.type !== "dir") {
        if (i === path.length - 1) return child;
        return null;
      }
      current = child;
    }
    return current;
  }

  function getCurrentDir(): FsDir | null {
    const node = getNodeAtPath(currentPath);
    if (node && node.type === "dir") return node;
    return null;
  }

  function getDisplayPath(): string {
    return currentPath.join("\\");
  }

  function addOutput(type: OutputLine["type"], text: string) {
    setOutput((prev) => [...prev, { type, text }]);
  }

  function addOutputLines(type: OutputLine["type"], lines: string[]) {
    setOutput((prev) => [...prev, ...lines.map((text) => ({ type, text }))]);
  }

  function resolvePath(input: string): string[] {
    if (input.startsWith("\\") || input.startsWith("/")) {
      const parts = input.slice(1).split(/[/\\]+/).filter(Boolean);
      return [currentPath[0], ...parts];
    }
    const parts = input.split(/[/\\]+/).filter(Boolean);
    const newPath = [...currentPath];
    for (const part of parts) {
      if (part === "..") {
        if (newPath.length > 1) newPath.pop();
      } else if (part === ".") {
        continue;
      } else {
        newPath.push(part);
      }
    }
    return newPath;
  }

  function processCommand(input: string) {
    const trimmed = input.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
    addOutput("input", `${getDisplayPath()}>${trimmed}`);

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case "help":
        cmdHelp();
        break;
      case "dir":
      case "ls":
        cmdDir();
        break;
      case "cd":
        cmdCd(args.join(" "));
        break;
      case "type":
        cmdType(args[0]);
        break;
      case "open":
        cmdOpen(args[0]);
        break;
      case "cls":
      case "clear":
        setOutput([]);
        break;
      case "whoami":
        cmdWhoami();
        break;
      case "ver":
        addOutput("output", "GR.OS Terminal v3.2.1 — Portfolio OS");
        break;
      case "tree":
        cmdTree();
        break;
      case "me":
        cmdMe();
        break;
      case "echo":
        addOutput("output", args.join(" "));
        break;
      case "date":
        addOutput("output", new Date().toLocaleString("pt-BR"));
        break;
      default:
        addOutput(
          "error",
          `'${cmd}' nao e reconhecido como um comando interno.`
        );
    }
  }

  function cmdHelp() {
    addOutputLines("output", [
      " COMANDOS DISPONIVEIS:",
      "",
      "   help                Mostra esta mensagem",
      "   dir / ls            Lista arquivos e pastas",
      "   cd <caminho>        Navega para uma pasta",
      "   cd ..               Volta uma pasta",
      "   cd \\                Volta para a raiz",
      "   type <arquivo>      Exibe conteudo de arquivo",
      "   open <arquivo.exe>  Abre uma secao do portfolio",
      "   open <arquivo.link> Abre link externo",
      "   cls / clear         Limpa o terminal",
      "   whoami              Exibe informacoes do usuario",
      "   ver                 Exibe versao do sistema",
      "   tree                Exibe arvore de diretorios",
      "   me                  Exibe foto em ASCII art",
      "   echo <texto>        Repete um texto",
      "   date                Exibe data e hora atual",
    ]);
  }

  function cmdDir() {
    const dir = getCurrentDir();
    if (!dir) {
      addOutput("error", "Erro ao acessar diretorio.");
      return;
    }
    const entries = Object.entries(dir.children);
    if (entries.length === 0) {
      addOutput("output", " Nenhum arquivo encontrado.");
      return;
    }
    addOutput("system", ` Diretorio: ${getDisplayPath()}`);
    addOutput("output", "");
    const dirs: string[] = [];
    const files: string[] = [];
    for (const [name, node] of entries) {
      if (node.type === "dir") dirs.push(name);
      else files.push(name);
    }
    dirs.sort().forEach((name) => {
      addOutput("output", `    <DIR>          ${name}`);
    });
    files.sort().forEach((name) => {
      addOutput("output", `                   ${name}`);
    });
    addOutput("output", `    ${entries.length} item(ns)`);
  }

  function cmdCd(target: string) {
    if (!target || target === "") {
      addOutput("output", getDisplayPath());
      return;
    }
    if (target === "\\" || target === "/") {
      setCurrentPath([currentPath[0]]);
      return;
    }
    const newPath = resolvePath(target);
    const node = getNodeAtPath(newPath);
    if (!node || node.type !== "dir") {
      addOutput(
        "error",
        "O sistema nao pode encontrar o caminho especificado."
      );
      return;
    }
    setCurrentPath(newPath);
  }

  function cmdType(filename: string) {
    if (!filename) {
      addOutput("error", "Sintaxe incorreta. Use: type <arquivo>");
      return;
    }
    const dir = getCurrentDir();
    if (!dir) return;
    const node = dir.children[filename];
    if (!node || node.type !== "text") {
      addOutput("error", `O sistema nao pode encontrar o arquivo ${filename}.`);
      return;
    }
    const lines = (node as FsFile).content?.split("\n") ?? [];
    addOutputLines("output", lines);
  }

  function cmdOpen(filename: string) {
    if (!filename) {
      addOutput("error", "Sintaxe incorreta. Use: open <arquivo>");
      return;
    }
    const dir = getCurrentDir();
    if (!dir) return;
    const node = dir.children[filename];
    if (!node || (node.type !== "exe" && node.type !== "link")) {
      addOutput("error", `Nao e possivel abrir ${filename}.`);
      return;
    }
    const file = node as FsFile;
    if (file.type === "exe" && file.sectionId) {
      const element = document.getElementById(file.sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        addOutput("system", `Abrindo ${filename}...`);
      } else {
        addOutput("error", `Secao '${file.sectionId}' nao encontrada.`);
      }
    } else if (file.type === "link" && file.url) {
      window.open(file.url, "_blank");
      addOutput("system", `Abrindo ${file.label || filename}...`);
    }
  }

  function cmdMe() {
    const osDir = getNodeAtPath(["C:", "GR", "OS"]);
    if (!osDir || osDir.type !== "dir") return;
    const node = osDir.children["me.txt"];
    if (!node || node.type !== "text") {
      addOutput("error", "Arquivo me.txt nao encontrado.");
      return;
    }
    const content = (node as FsFile).content ?? "";
    addOutput("ascii", content);
  }

  function cmdWhoami() {
    addOutputLines("output", [
      "",
      "  Usuario:      Gustavo Rodrigues",
      "  Cargo:        Full Stack Developer",
      "  Github:       Devgusta5",
      "  Educacao:     ADS — UNISANTA",
      "  Conquistas:   2x Hackathon Winner",
      "",
    ]);
  }

  function cmdTree() {
    const dir = getCurrentDir();
    if (!dir) return;
    function buildTree(node: FsNode, prefix: string): string[] {
      if (node.type !== "dir") return [];
      const lines: string[] = [];
      const entries = Object.entries(node.children);
      entries.forEach(([name, child], index) => {
        const isLast = index === entries.length - 1;
        const connector = isLast ? "└── " : "├── ";
        const childPrefix = isLast ? "    " : "│   ";
        if (child.type === "dir") {
          lines.push(`${prefix}${connector}${name}/`);
          lines.push(...buildTree(child, `${prefix}${childPrefix}`));
        } else {
          const ext =
            child.type === "exe"
              ? " [exe]"
              : child.type === "link"
                ? " [link]"
                : "";
          lines.push(`${prefix}${connector}${name}${ext}`);
        }
      });
      return lines;
    }
    const tree = buildTree(dir, "");
    addOutput("output", `Arvore de ${getDisplayPath()}:`);
    addOutput("output", "");
    addOutputLines("output", tree);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      processCommand(inputValue);
      setInputValue("");
      setCursorPos(0);
    } else if (e.key === "Home") {
      e.preventDefault();
      setCursorPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setCursorPos(inputValue.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInputValue(commandHistory[newIndex]);
      setCursorPos(commandHistory[newIndex].length);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputValue("");
        setCursorPos(0);
      } else {
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
        setCursorPos(commandHistory[newIndex].length);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
    }
  }

  function handleHelpMouseEnter() {
    clearTimeout(helpTimeout.current);
    setShowHelp(true);
  }

  function handleHelpMouseLeave() {
    helpTimeout.current = setTimeout(() => setShowHelp(false), 200);
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-2)] font-mono text-xs sm:text-sm">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-3)] px-3 py-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-3)] sm:text-[10px]">
            GR.OS Terminal
          </span>
          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_6px_var(--accent)] sm:h-2 sm:w-2" />
          </span>
        </div>

        <div
          className="relative"
          onMouseEnter={handleHelpMouseEnter}
          onMouseLeave={handleHelpMouseLeave}
        >
          <button
            type="button"
            className="flex h-5 w-5 cursor-pointer items-center justify-center rounded text-[10px] text-[var(--text-3)] transition-colors hover:bg-[var(--card-hover)] hover:text-[var(--text)]"
            onClick={() => processCommand("help")}
            aria-label="Ajuda com comandos"
          >
            ?
          </button>

          {showHelp && (
            <div
              className="absolute right-0 top-6 z-50 w-56 rounded-lg border border-[var(--border)] bg-[var(--bg-2)] p-3 shadow-2xl backdrop-blur-xl"
              onMouseEnter={handleHelpMouseEnter}
              onMouseLeave={handleHelpMouseLeave}
            >
              <p className="mb-2 text-[9px] uppercase tracking-[0.2em] text-[var(--text-3)]">
                Comandos
              </p>
              <div className="space-y-1">
                {[
                  ["help", "Ajuda"],
                  ["dir / ls", "Listar pastas"],
                  ["cd", "Navegar"],
                  ["type", "Ler arquivo"],
                  ["open", "Secao/Link"],
                  ["cls", "Limpar"],
                  ["whoami", "Info usuario"],
                  ["me", "ASCII art"],
                  ["tree", "Arvore"],
                ].map(([cmd, desc]) => (
                  <div
                    key={cmd}
                    className="flex items-center justify-between text-[10px]"
                  >
                    <span className="font-semibold text-[var(--accent)]">
                      {cmd}
                    </span>
                    <span className="text-[var(--text-3)]">{desc}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  processCommand("help");
                  setShowHelp(false);
                }}
                className="mt-2 w-full rounded bg-[var(--card-hover)] py-1 text-[9px] text-[var(--text-2)] transition-colors hover:text-[var(--text)]"
              >
                detalhes no terminal &gt;
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Terminal body */}
      <div className="relative">
        {/* Scrollable output with inline prompt */}
        <div
          ref={outputRef}
          onClick={focusInput}
          role="log"
          aria-live="polite"
          aria-label="Saída do terminal"
          className="h-[220px] cursor-text overflow-y-auto bg-[var(--bg)] p-4 leading-relaxed scrollbar-thin sm:h-[270px] lg:h-[470px]"
        >
          {output.map((line, i) => (
            <div key={i}>
              {line.type === "ascii" ? (
                <div className="ascii-art-wrap">
                  <div className="ascii-art-text">{line.text}</div>
                </div>
              ) : (
                <div
                  className={`whitespace-pre-wrap break-all ${
                    line.type === "input"
                      ? "text-[var(--accent)]"
                      : line.type === "error"
                        ? "text-red-400"
                        : line.type === "system"
                          ? "text-[var(--text-2)]"
                          : "text-[var(--text)]"
                  }`}
                >
                  {line.text}
                </div>
              )}
            </div>
          ))}

          {/* Prompt + typed text + cursor (inline no output) */}
          <div ref={promptRef} className="mt-0.5 flex items-center">
            <span className="shrink-0 text-[var(--accent)]">
              {getDisplayPath()}&gt;
            </span>
            <span className="whitespace-pre text-[var(--text)]">
              {inputValue.slice(0, cursorPos)}
            </span>
            <span className="inline-block h-[1em] w-[0.55em] animate-cursor-blink bg-[var(--accent)]" />
            <span className="whitespace-pre text-[var(--text)]">
              {inputValue.slice(cursorPos)}
            </span>
          </div>
        </div>

        {/* Botão visível para focar o input (mobile/accessibility) */}
        <button
          type="button"
          onClick={() => inputRef.current?.focus()}
          className="absolute bottom-1 left-1 z-10 rounded border border-[var(--border)] bg-[var(--bg-2)] px-2 py-0.5 text-[10px] text-[var(--text-3)] transition-colors hover:text-[var(--accent)] sm:hidden"
          aria-label="Focar no terminal"
        >
          digitar comando
        </button>

        {/* Input oculto (1px) no canto inferior — só captura teclas, não atrapalha scroll */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setCursorPos(e.target.selectionStart ?? e.target.value.length);
          }}
          onKeyDown={handleKeyDown}
          onMouseUp={(e) => setCursorPos(e.currentTarget.selectionStart ?? inputValue.length)}
          onKeyUp={(e) => {
            const target = e.currentTarget;
            setCursorPos(target.selectionStart ?? target.value.length);
          }}
          className="absolute bottom-1 right-1 z-10 h-px w-px opacity-0"
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label="Digite um comando do terminal"
        />
      </div>
    </div>
  );
}
