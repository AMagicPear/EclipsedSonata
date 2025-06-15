import NPC from "./NPC";
import IDialog from "./util/IDialog";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Zhanglao extends NPC {
    hasSelfDialog: boolean = true;
    override dialogContent: IDialog[] = [
        { role: 1, text: "长老……" },
        { role: 1, text: "为什么我的鼓……" },
        { role: 1, text: "它今天敲不响了？" },
        { role: 2, text: "我今天也感觉不对劲" },
        { role: 2, text: "我的嗓音……" },
        { role: 2, text: "我的嗓音它……" },
        { role: 1, text: "淅淅不哭，你的嗓音怎么了？" },
        { role: 2, text: "呜呜，今天的晚会是我练习了很久的歌曲……" },
        { role: 2, text: "可是，可是我拼尽全力也只能发出一个音符" },
        { role: 2, text: "我不会是被音符之神下了诅咒吧" },
        { role: 0, text: "八音盒丢了" },
        { role: 0, text: "如果没有八音盒的话" },
        { role: 0, text: "今天晚上的晚会也开不了了" },
        { role: 0, text: "也许往前方探险能找到它吧" }
    ]
}