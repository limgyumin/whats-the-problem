import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Markdown from "markdown-to-jsx";
import "./MarkDown.scss";

interface MarkDownProps {
  children: string;
}

const markedH1 = ({ children }: { children: string }) => {
  return <h1 id={children.toString().replace(/\s/g, "-")}>{children}</h1>;
};

const markedH2 = ({ children }: { children: string }) => {
  return <h2 id={children.toString().replace(/\s/g, "-")}>{children}</h2>;
};

const markedH3 = ({ children }: { children: string }) => {
  return <h3 id={children.toString().replace(/\s/g, "-")}>{children}</h3>;
};

const markedH4 = ({ children }: { children: string }) => {
  return <h4 id={children.toString().replace(/\s/g, "-")}>{children}</h4>;
};

const markedH5 = ({ children }: { children: string }) => {
  return <h5 id={children.toString().replace(/\s/g, "-")}>{children}</h5>;
};

const markedH6 = ({ children }: { children: string }) => {
  return <h6 id={children.toString().replace(/\s/g, "-")}>{children}</h6>;
};

const markedA = ({ children, ...props }: { children: string }) => {
  return (
    <a {...props} target="_blank">
      {children}
    </a>
  );
};

const MarkDown = ({ children }: MarkDownProps) => {
  return (
    <>
      <div className="MarkDown">
        <Markdown
          options={{
            overrides: {
              h1: markedH1,
              h2: markedH2,
              h3: markedH3,
              h4: markedH4,
              h5: markedH5,
              h6: markedH6,
              a: markedA,
              code: CustomCode,
            },
            forceBlock: true,
          }}
        >
          {children}
        </Markdown>
      </div>
    </>
  );
};

const CustomCode = ({ children, ...props }) => {
  const match = /lang-(\w+)/.exec(props.className || "");
  return match ? (
    <SyntaxHighlighter
      language={match[1]}
      PreTag="div"
      style={dracula}
      {...props}
    >
      {children}
    </SyntaxHighlighter>
  ) : (
    <code {...props}>{children}</code>
  );
};

export default MarkDown;
