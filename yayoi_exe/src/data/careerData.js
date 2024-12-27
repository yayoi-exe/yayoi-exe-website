const careerData = [
    {
        id: 1,
        institution: "東京工業国等専門学校",
        department: "情報工学科",
        startYear: 2017,
        endYear: 2022,
        projects: [
            {
                title: "移動困難者向け支援サービス円滑化のためのシステム構築と利用実態把握のためのデータ分析",
                description: `
                    車の位置情報から停車場所、利用頻度、利用範囲、速度超過などをPythonで分析。
                    車の予約フォームや予約カレンダー、停車場所一覧、現在地、速度超過確認ページなどを
                    Vue.jsとDjangoで開発。
                `,
                techStack: ["Python", "Vue.js", "Django"]
            },
        ],
    },
    {
        id: 2,
        institution: "東京工業国等専門学校",
        department: "専攻科 機械情報システム工学専攻",
        startYear: 2022,
        endYear: 2024,
        projects: [
            {
                title: "ディープラーニングを使用した光源方向に依存しない点字文字認識",
                description: `
                    ディープラーニングを活用し、光源方向に依存しない点字認識技術を開発。
                    PyTorchを使用し、物体検出ライブラリDetectron2を採用。
                    新しいデータセットを組み合わせ、認識精度AP50で97%を達成。
                `,
                techStack: ["Python (PyTorch)", "Detectron2"],
                achievements: [
                    {
                        name: "情報処理学会 第86回全国大会",
                        link: "https://www.ipsj.or.jp/event/taikai/86/WEB/data/pdf/1ZJ-01.html",
                    },
                    {
                        name: "論文ページ",
                        link: "https://ipsj.ixsq.nii.ac.jp/ej/?action=repository_uri&item_id=236923&file_id=1&file_no=1",
                    },
                ]
            },
        ],
    },
    {
        id: 3,
        institution: "慶應義塾大学大学院",
        department: "メディアデザイン研究科",
        startYear: 2024,
        endYear: 2026,
        projects: [
            {
                title: "動作不要型のアバター操作デバイスと触覚フィードバックを用いた身体所有感向上に関する研究",
                description: `
                    VRや触覚フィードバックシステムを活用した研究。
                    身体所有感を高めるためのデバイスの設計と実験を予定。
                `,
                techStack: ["VR", "触覚フィードバックシステム"],
                achievements: []
            },
        ],
    },
];

export default careerData;