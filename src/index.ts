import "@logseq/libs";
import { HighlightsSyncService } from "./highlightsService";
import { LogseqService } from "./logseq";
import { settingSchema } from "./settings";

const highlightsSyncService = new HighlightsSyncService();

const logseqService = new LogseqService(highlightsSyncService);

logseq.useSettingsSchema(settingSchema).ready(logseqService.init);

logseq.onSettingsChanged(logseqService.init);
