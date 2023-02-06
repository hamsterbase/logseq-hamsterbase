import { stringToUUIDFormat } from "./utils";

export type Block = {
  content: string;
  children?: Block[];
  properties?: Record<string, string>;
};

export type WebpageWithHighlight = {
  title: string;
  link?: string;
  id: string;
  highlights: {
    highlightId: string;
    text: string;
    note?: string;
  }[];
  highlight?: {
    highlightId: string;
    text: string;
    note?: string;
  };
};

function replaceContent(webpage: WebpageWithHighlight, content: string) {
  return content.replace(/`{{(.*?)}}`/g, (replace, key) => {
    const keys = key.split(".");
    let value: any = webpage;
    for (const key of keys) {
      value = value?.[key];
    }
    if (!value) {
      return "";
    }
    return String(value);
  });
}

export function formatBlock(
  webpage: WebpageWithHighlight,
  template: Block[]
): Block[] {
  const blocks = template.map((o): Block | Array<Block> => {
    if (o.content === "`{{highlights}}`") {
      return webpage.highlights.map((highlight): Block => {
        return {
          content: replaceContent(
            { ...webpage, highlight },
            o.children![0].content
          ),
          properties: {
            id: stringToUUIDFormat(highlight.highlightId),
          },
        };
      });
      //
    }
    return {
      content: replaceContent(webpage, o.content),
      children: o.children ? formatBlock(webpage, o.children) : [],
    };
  });
  let result: Block[] = [];
  for (const iterator of blocks) {
    if (Array.isArray(iterator)) {
      result = result.concat(iterator);
    } else {
      result.push(iterator);
    }
  }
  return result;
}

export const defaultTemplate = [
  {
    content: "## metadata",
    children: [
      {
        content: "title: `{{title}}`",
      },
      {
        content: "link: `{{link}}`",
      },
    ],
  },
  {
    content: "## highlights",
    children: [
      {
        content: "`{{highlights}}`",
        children: [
          {
            content: "> `{{highlight.text}}` \n\n `{{highlight.note}}`",
          },
        ],
      },
    ],
  },
];
