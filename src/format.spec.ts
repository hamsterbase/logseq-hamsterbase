import { expect, it } from "vitest";
import { formatBlock } from "./format";

it("", () => {
  const res = formatBlock(
    {
      id: "9c75f658c89b0c8580375f51ca843ccdcad3c8b402cc99b9cacdd4c4f8f665f6",
      title: "Don’t think to write, write to think - Herbert Lui",
      link: "https://herbertlui.net/dont-think-to-write-write-to-think/",
      highlights: [
        {
          highlightId: "0000000010_d3692df7-fd33-424a-8a1b-aaa5e9a7cfde",
          text: "Writing is not the artifact of thinking, it’s the actual thinking process.",
        },
      ],
    },
    [
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
                content: "> `{{highlight.text}}` \n `{{highlight.note}}`",
              },
            ],
          },
        ],
      },
    ]
  );

  expect(JSON.stringify(res, null, 2)).toMatchSnapshot("default-template");
});
