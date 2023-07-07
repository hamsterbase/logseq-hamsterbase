import "@logseq/libs";
import md5 from "crypto-js/md5";
import {
  Block,
  defaultTemplate,
  formatBlock,
  WebpageWithHighlight,
} from "./format";
import { LogseqHamsterBaseSettingKeys } from "./settings";
import { HighlightsSyncService } from "./highlightsService";

export interface LogseqSettings {
  namespace: string;
  token: string | null;
  endpoint: string | null;
}

export class LogseqService {
  private get settings(): LogseqSettings {
    const namespace =
      logseq.settings?.[LogseqHamsterBaseSettingKeys.namespace] ||
      "hamsterbase/highlights";

    const endpoint =
      logseq.settings?.[LogseqHamsterBaseSettingKeys.endpoint] || null;

    const token = logseq.settings?.[LogseqHamsterBaseSettingKeys.token] || null;

    return { token, endpoint, namespace };
  }

  constructor(private highlightService: HighlightsSyncService) {
    this.init = this.init.bind(this);
  }

  init() {
    logseq.App.registerCommandPalette(
      {
        key: "logseq-hamsterbase-clean",
        label: `Delete all webpage under ${this.settings.namespace}`,
      },
      this.clean.bind(this)
    );
    logseq.App.registerCommandPalette(
      {
        key: "logseq-hamsterbase-sync",
        label: `Sync all highlights from HamsterBase to ${this.settings.namespace}`,
      },
      this.sync.bind(this)
    );
    this.highlightService.init(this.settings.endpoint, this.settings.token);
  }

  private async sync() {
    const webpages = await this.highlightService.getWebpages();
    for (const webpage of webpages) {
      try {
        await createWebpage(webpage, defaultTemplate, this.settings.namespace);
      } catch (error) {}
    }
  }

  private async clean() {
    if (!this.settings.namespace) {
      return;
    }
    const webpages = await logseq.Editor.getPagesFromNamespace(
      this.settings.namespace
    );
    if (webpages) {
      for (const iterator of webpages) {
        await logseq.Editor.deletePage(iterator.name);
      }
    }
  }
}

export async function clean(namespace: string) {
  const webpages = await logseq.Editor.getPagesFromNamespace(namespace);
  if (webpages) {
    for (const iterator of webpages) {
      await logseq.Editor.deletePage(iterator.name);
    }
  }
}

export async function createWebpage(
  webpage: WebpageWithHighlight,
  template: Block[],
  namespace: string
) {
  const blocks = formatBlock(webpage, template);
  const documentHash = md5(JSON.stringify(blocks, null, 2)).toString();
  const pageName = namespace + "/" + webpage.title.replace(/\//g, "\\");
  const page = await logseq.Editor.getPage(pageName);

  if (page) {
    if (
      webpage.id !== page.properties?.hamsterbaseId ||
      documentHash !== page.properties?.documentHash
    ) {
      await logseq.Editor.deletePage(pageName);
    } else {
      return;
    }
  }
  await logseq.Editor.createPage(
    pageName,
    {
      hamsterbaseId: webpage.id,
      documentHash,
    },
    { redirect: false, createFirstBlock: false }
  );

  const first = (await logseq.Editor.getPageBlocksTree(pageName))[0].uuid;

  await logseq.Editor.insertBatchBlock(first, blocks, {
    keepUUID: true,
  });
}
