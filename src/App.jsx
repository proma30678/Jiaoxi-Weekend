import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays, Map, BookOpen, Bookmark, Home, ChevronLeft, ChevronRight,
  Settings, Plane, MapPin, Coffee, Utensils, Hotel, Bus, Waves,
  ExternalLink, Plus, Navigation, Star, Wallet, Heart
} from "lucide-react";

function Card({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function Button({ className = "", children, onClick, type = "button" }) {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

function googleMapsDestinationUrl(destination, mode = "driving") {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=${mode}`;
}

function googleMapsRouteUrl(origin, destination, mode = "driving") {
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=${mode}`;
}

const days = [
  {
    id: 1,
    weekday: "WED",
    date: "24",
    month: "06月",
    title: "中西區散步",
    subtitle: "台南車站 → 友愛街",
    dayLabel: "Day 1 / 2",
    plan: [
      {
        time: "11:00",
        title: "抵達台南，先放行李",
        place: "友愛街旅館 U.I.J Hotel & Hostel",
        area: "友愛街",
        tag: "住宿",
        icon: Hotel,
        note: "建議從台南車站直接搭計程車或公車到友愛街一帶，先寄放行李，讓下午行程用走的就能銜接。",
        destination: "友愛街旅館",
        mode: "transit",
      },
      {
        time: "12:00",
        title: "國華街／友愛市場午餐",
        place: "國華街、友愛市場周邊",
        area: "中西區",
        tag: "午餐",
        icon: Utensils,
        note: "第一餐安排在住宿附近，吃碗粿、米糕、牛肉湯、蝦仁飯或甜湯都很順，不用特別拉車。",
        destination: "台南 國華街 友愛市場",
        mode: "walking",
      },
      {
        time: "13:40",
        title: "臺南市美術館 2 館",
        place: "臺南市中西區忠義路二段 1 號",
        area: "美術館",
        tag: "主行程",
        icon: Star,
        note: "這趟的主景點。建築本身很適合拍照，也能慢慢看展；若是週六可考慮排晚一點，因為延長開放到晚上。",
        destination: "臺南市美術館2館",
        mode: "walking",
      },
      {
        time: "15:40",
        title: "美術館 1 館／司法博物館外觀",
        place: "南門路、府前路周邊",
        area: "孔廟商圈",
        tag: "散步",
        icon: Map,
        note: "如果還想看展就接美術館 1 館；想放鬆則沿著孔廟、司法博物館外觀散步即可。",
        destination: "臺南市美術館1館",
        mode: "walking",
      },
      {
        time: "16:40",
        title: "林百貨與孔廟商圈",
        place: "林百貨、孔廟周邊",
        area: "中西區",
        tag: "選物",
        icon: Bookmark,
        note: "適合逛伴手禮、文創小物與老街區。這段離住宿近，累了可以直接回飯店休息。",
        destination: "林百貨",
        mode: "walking",
      },
      {
        time: "18:00",
        title: "回飯店 Check-in／休息",
        place: "友愛街旅館",
        area: "住宿",
        tag: "休息",
        icon: Home,
        note: "台南兩天一夜不要硬塞太滿，中間回房間躺一下，晚上才有精神散步。",
        destination: "友愛街旅館",
        mode: "walking",
      },
      {
        time: "19:15",
        title: "海安路／國華街晚餐",
        place: "海安路、國華街周邊",
        area: "中西區",
        tag: "晚餐",
        icon: Utensils,
        note: "晚餐保留彈性，可以吃小吃、鹹粥、牛肉湯，也可以改找餐酒館。重點是都離住宿近。",
        destination: "台南 海安路 國華街 晚餐",
        mode: "walking",
      },
      {
        time: "20:40",
        title: "神農街與河樂廣場夜散步",
        place: "神農街、河樂廣場",
        area: "夜散步",
        tag: "拍照",
        icon: Heart,
        note: "晚上走神農街最有氣氛，想喝一杯或買甜點也方便；河樂廣場可作為飯後收尾。",
        destination: "神農街",
        mode: "walking",
      },
    ],
  },
  {
    id: 2,
    weekday: "THU",
    date: "25",
    month: "06月",
    title: "古蹟與伴手禮",
    subtitle: "赤崁樓 → 藍晒圖 → 回程",
    dayLabel: "Day 2 / 2",
    plan: [
      {
        time: "09:00",
        title: "友愛街附近早餐",
        place: "友愛街、國華街、民生路周邊",
        area: "中西區",
        tag: "早餐",
        icon: Coffee,
        note: "第二天不要太早趕路，找附近早餐或咖啡店即可，保留退房時間。",
        destination: "友愛街 早餐",
        mode: "walking",
      },
      {
        time: "10:15",
        title: "退房與寄放行李",
        place: "友愛街旅館",
        area: "住宿",
        tag: "退房",
        icon: Hotel,
        note: "先把行李寄放，接下來的市區景點用走路或短程計程車即可。",
        destination: "友愛街旅館",
        mode: "walking",
      },
      {
        time: "10:40",
        title: "赤崁樓周邊散步",
        place: "赤崁樓、祀典武廟、大天后宮",
        area: "古蹟",
        tag: "主行程",
        icon: MapPin,
        note: "赤崁樓周邊景點集中，適合安排 1–1.5 小時慢慢走，也方便補吃小吃。",
        destination: "赤崁樓",
        mode: "walking",
      },
      {
        time: "12:10",
        title: "赤崁樓或國華街午餐",
        place: "民族路、國華街周邊",
        area: "中西區",
        tag: "午餐",
        icon: Utensils,
        note: "依照當天排隊狀況選擇，不建議為單一名店排太久，避免壓縮下午回程。",
        destination: "台南 赤崁樓 午餐",
        mode: "walking",
      },
      {
        time: "13:30",
        title: "藍晒圖文創園區",
        place: "臺南市南區西門路一段 689 巷",
        area: "文創",
        tag: "拍照",
        icon: Bookmark,
        note: "最後安排輕量景點，拍照、逛小店剛好，也離友愛街一帶不遠。",
        destination: "藍晒圖文創園區",
        mode: "walking",
      },
      {
        time: "14:45",
        title: "買伴手禮／回飯店拿行李",
        place: "國華街、友愛街周邊",
        area: "回程前",
        tag: "伴手禮",
        icon: Star,
        note: "可補買甜點、餅舖或文創小物。若回程較晚，也可加一間咖啡廳休息。",
        destination: "友愛街旅館",
        mode: "walking",
      },
      {
        time: "16:00",
        title: "前往台南車站／高鐵台南站",
        place: "依回程交通選擇",
        area: "回程",
        tag: "交通",
        icon: Bus,
        note: "若搭高鐵，可從台南車站轉台鐵沙崙線，或直接搭計程車／接駁車到高鐵站。",
        destination: "台南車站",
        mode: "transit",
      },
    ],
  },
];

const backupSpots = [
  { name: "安平老街／安平古堡", type: "半日備案", time: "約 2–3 小時", desc: "若第二天回程較晚，可以把赤崁樓改成安平半日；交通建議計程車或公車，不要排太晚。", icon: MapPin, destination: "安平老街", mode: "driving" },
  { name: "漁光島", type: "海邊備案", time: "約 60–90 分鐘", desc: "天氣好又想看海時可加入，但兩天一夜建議作為加碼，不要硬塞進主線。", icon: Waves, destination: "漁光島", mode: "driving" },
  { name: "臺南市美術館 1 館", type: "展覽備案", time: "約 60 分鐘", desc: "若 2 館看完還有興趣，可同日延伸到 1 館，兩館距離很近。", icon: Star, destination: "臺南市美術館1館", mode: "walking" },
  { name: "蝸牛巷", type: "散步備案", time: "約 30–45 分鐘", desc: "住宿附近的短程散步點，適合拍照、轉場或等餐廳空檔。", icon: Map, destination: "蝸牛巷 台南", mode: "walking" },
  { name: "旭峯號／選物小店群", type: "雨天備案", time: "約 45–60 分鐘", desc: "下雨時可把戶外散步改成選物店與咖啡店串連。", icon: Bookmark, destination: "台南 中西區 選物店", mode: "walking" },
  { name: "河樂廣場", type: "夜間備案", time: "約 20–40 分鐘", desc: "晚餐後不想走太遠時可到河樂廣場散步，和神農街可一起安排。", icon: Heart, destination: "河樂廣場", mode: "walking" },
];

const mapRoutes = [
  { title: "台南車站 → 友愛街旅館", subtitle: "抵達後前往住宿", icon: Hotel, origin: "台南車站", destination: "友愛街旅館", mode: "transit" },
  { title: "友愛街旅館 → 臺南市美術館 2 館", subtitle: "Day 1 主行程", icon: Star, origin: "友愛街旅館", destination: "臺南市美術館2館", mode: "walking" },
  { title: "美術館 → 神農街", subtitle: "晚餐後夜散步", icon: Heart, origin: "臺南市美術館2館", destination: "神農街", mode: "walking" },
  { title: "友愛街旅館 → 赤崁樓", subtitle: "Day 2 古蹟散步", icon: MapPin, origin: "友愛街旅館", destination: "赤崁樓", mode: "walking" },
  { title: "藍晒圖 → 台南車站", subtitle: "回程銜接", icon: Bus, origin: "藍晒圖文創園區", destination: "台南車站", mode: "transit" },
];

const notes = [
  "住宿建議：友愛街、國華街、海安路一帶，優先選可寄放行李、步行可到美術館與國華街的位置。",
  "美術館提醒：臺南市美術館週一休館，週六延長開放至 21:00，排週六會更有彈性。",
  "交通策略：中西區主線以步行為主，安平、漁光島再使用公車或短程計程車。",
  "飲食策略：保留小吃彈性，不為單一名店排太久，避免兩天一夜節奏被打亂。",
];

function DayCard({ day, active, onClick }) {
  return (
    <button onClick={onClick} className={`min-w-[92px] rounded-[1.7rem] px-4 py-4 shadow-sm transition-all ${active ? "bg-[#3f372d] text-[#fff8ed]" : "bg-[#fffaf0] text-[#6a5948] hover:bg-white"}`}>
      <div className="flex items-start justify-center gap-1 text-xs tracking-[0.22em] italic opacity-80">
        <span>{day.weekday}</span><span className="text-[10px] normal-case">D{day.id}</span>
      </div>
      <div className="mt-2 text-4xl font-serif leading-none">{day.date}</div>
      <div className="mt-1 text-sm tracking-widest opacity-80">{day.month}</div>
    </button>
  );
}

function Tag({ children, dark = false }) {
  return <span className={`rounded-full px-3 py-1 text-xs tracking-widest ${dark ? "bg-[#4d4439] text-[#fff8ed]" : "bg-[#eadcc3] text-[#8a6945]"}`}>{children}</span>;
}

function TimelineItem({ item, index, compact = false }) {
  const Icon = item.icon;
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.045 }} className="rounded-[1.45rem] bg-[#fffaf0]/85 p-5 shadow-sm ring-1 ring-[#eadcc3]/70">
      <div className="grid grid-cols-[62px_1fr] gap-4">
        <div className="font-serif text-lg text-[#a07b4f]">{item.time}</div>
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-[#4b4036]">{item.title}</h3>
              <p className="mt-1 text-sm text-[#8a755e]">{item.place}</p>
            </div>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#efe4cf] text-[#6e5a43]"><Icon size={18} /></div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2"><Tag>{item.area}</Tag><Tag>{item.tag}</Tag></div>
          {!compact && <p className="mt-4 text-sm leading-relaxed text-[#6f6256]">{item.note}</p>}

          <div className="mt-4 flex flex-wrap gap-2 border-t border-dashed border-[#dfd1b8] pt-4">
            <a href={googleMapsDestinationUrl(item.destination || item.place || item.title, item.mode || "driving")} target="_blank" rel="noreferrer">
              <Button className="h-9 rounded-full bg-[#efe6d3] px-4 text-[#6e5b45] shadow-none hover:bg-[#e6d6bb]">
                <Navigation className="mr-2 inline" size={15} /> 從目前位置導航
              </Button>
            </a>
            <Button className="h-9 rounded-full bg-[#efe6d3] px-4 text-[#6e5b45] shadow-none hover:bg-[#e6d6bb]">
              <Bookmark className="mr-2 inline" size={15} /> 加入地圖
            </Button>
            <Button className="h-9 rounded-full bg-[#efe6d3] px-4 text-[#6e5b45] shadow-none hover:bg-[#e6d6bb]">編輯</Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BackupSpotCard({ spot }) {
  const Icon = spot.icon;
  return (
    <Card className="rounded-[1.6rem] border-0 bg-[#fffaf0]/90 shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#eadcc3] text-[#6e5a43]"><Icon size={22} /></div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap gap-2"><Tag>{spot.type}</Tag><Tag>{spot.time}</Tag></div>
            <h3 className="mt-3 text-lg font-semibold text-[#4b4036]">{spot.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#756757]">{spot.desc}</p>
            <a href={googleMapsDestinationUrl(spot.destination || spot.name, spot.mode || "driving")} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center rounded-full bg-[#3f372d] px-4 py-2 text-sm text-[#fff8ed]">
              <Navigation className="mr-2" size={15} /> 從目前位置導航
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RouteCard({ route }) {
  const Icon = route.icon;
  const url = googleMapsRouteUrl(route.origin, route.destination, route.mode || "driving");
  return (
    <a href={url} target="_blank" rel="noreferrer" className="block">
      <Card className="rounded-[1.5rem] border-0 bg-[#fffaf0]/90 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <CardContent className="flex items-center gap-4 p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#3f372d] text-white"><Icon size={22} /></div>
          <div className="min-w-0 flex-1"><h3 className="font-semibold text-[#4b4036]">{route.title}</h3><p className="mt-1 text-sm text-[#8a755e]">{route.subtitle}</p></div>
          <ExternalLink size={18} className="text-[#a8895f]" />
        </CardContent>
      </Card>
    </a>
  );
}

function BottomNav({ view, setView }) {
  const items = [
    { label: "行程", icon: CalendarDays, key: "schedule" },
    { label: "地圖", icon: Map, key: "map" },
    { label: "首頁", icon: Home, key: "home", active: true },
    { label: "記帳", icon: BookOpen, key: "budget" },
    { label: "景點", icon: Bookmark, key: "spots" },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 mx-auto max-w-md border-t border-[#e5d9c2] bg-[#fffaf1]/95 px-4 pb-3 pt-3 shadow-[0_-8px_30px_rgba(69,55,35,0.08)] backdrop-blur">
      <div className="grid grid-cols-5 items-end gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const selected = view === item.key;
          if (item.active) {
            return (
              <button key={item.label} onClick={() => setView(item.key)} className="flex flex-col items-center gap-1 text-[#3f372d]">
                <div className={`-mt-9 flex h-[72px] w-[72px] items-center justify-center rounded-full border-[6px] border-[#eadcc3] text-white shadow-lg ${selected ? "bg-[#3f372d]" : "bg-[#6b5c4d]"}`}><Icon size={30} /></div>
                <span className="text-sm font-semibold tracking-widest">{item.label}</span>
              </button>
            );
          }
          return (
            <button key={item.label} onClick={() => setView(item.key)} className={`flex flex-col items-center gap-2 ${selected ? "text-[#3f372d]" : "text-[#b19f87]"}`}>
              <Icon size={27} />
              <span className="text-sm tracking-widest">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="relative px-7 pb-5 pt-8">
      <div className="absolute right-7 top-9 flex h-14 w-14 items-center justify-center rounded-full bg-[#fffaf0] text-[#665744] shadow-md"><Settings size={24} /></div>
      <p className="font-serif text-lg italic tracking-[0.25em] text-[#b08d63]">Tainan Weekend</p>
      <h1 className="mt-4 font-serif text-5xl font-semibold tracking-wide text-[#4a4037]">台南 遊記</h1>
      <p className="mt-3 text-sm tracking-[0.18em] text-[#9a7f5d]">友愛一下、美術館與府城小吃的兩天一夜</p>
    </header>
  );
}

export default function TainanCoupleTripSite() {
  const [activeDay, setActiveDay] = useState(0);
  const [view, setView] = useState("home");

  const [expenses, setExpenses] = useState([]);
  const [expenseForm, setExpenseForm] = useState({
    item: "",
    amount: "",
    payer: "",
    category: "餐飲",
  });

  const current = days[activeDay];
  const progress = useMemo(() => ((activeDay + 1) / days.length) * 100, [activeDay]);

  const totalExpense = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );

  function addExpense(event) {
    event.preventDefault();

    const amount = Number(expenseForm.amount);
    if (!expenseForm.item.trim() || !amount || amount <= 0) return;

    setExpenses((prev) => [
      ...prev,
      {
        id: Date.now(),
        item: expenseForm.item.trim(),
        amount,
        payer: expenseForm.payer.trim() || "未填",
        category: expenseForm.category || "其他",
      },
    ]);

    setExpenseForm({
      item: "",
      amount: "",
      payer: "",
      category: "餐飲",
    });
  }

  function removeExpense(id) {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  }

  const todayPreview = current.plan.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#efe7d0] text-[#4b4036]">
      <div className="mx-auto min-h-screen max-w-md overflow-hidden bg-[radial-gradient(circle_at_top,#f8f0dc_0%,#eee4c9_50%,#e8dcc2_100%)] pb-28 shadow-2xl">
        <Header />

        <section className="px-7">
          <div className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none]">
            {days.map((day, index) => <DayCard key={day.id} day={day} active={activeDay === index} onClick={() => setActiveDay(index)} />)}
          </div>

          <div className="mt-2 flex items-center gap-4">
            <Button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fffaf0] p-0 text-[#6e5b45] shadow-sm hover:bg-white" onClick={() => setActiveDay((prev) => Math.max(0, prev - 1))}><ChevronLeft /></Button>
            <div className="relative h-3 flex-1 overflow-visible rounded-full bg-[#e4d8bf]">
              <motion.div className="h-full rounded-full bg-[#3f372d]" animate={{ width: `${progress}%` }} />
              <motion.div className="absolute top-1/2 h-8 w-8 -translate-y-1/2 rounded-full border-4 border-white bg-[#3f372d] shadow-md" animate={{ left: `calc(${progress}% - 16px)` }} />
            </div>
            <Button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fffaf0] p-0 text-[#6e5b45] shadow-sm hover:bg-white" onClick={() => setActiveDay((prev) => Math.min(days.length - 1, prev + 1))}><ChevronRight /></Button>
          </div>
          <p className="mt-3 text-center font-serif text-sm italic tracking-[0.2em] text-[#9b856a]">{current.dayLabel}</p>
        </section>

        <main className="mt-7 px-7">
          {view === "home" && (
            <>
              <section className="rounded-[2rem] border border-dashed border-[#b89869] bg-[#fffaf0]/70 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3"><Plane size={21} className="text-[#8a6945]" /><h2 className="font-semibold tracking-widest">出發資訊・導航總覽</h2></div>
                  <ExternalLink size={18} className="text-[#a8895f]" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#66594d]">以友愛街旅館為中心，把美術館、國華街、神農街、赤崁樓與藍晒圖整理成兩天一夜的步行路線。點「從目前位置導航」會直接開啟 Google Maps。</p>
              </section>

              <section className="mt-7">
                <div className="mb-4 flex items-end justify-between"><h2 className="text-2xl font-bold tracking-widest">今日行程</h2><button onClick={() => setView("schedule")} className="text-sm tracking-widest text-[#9b7a51]">查看全部 ›</button></div>
                <Card className="rounded-[2rem] border-0 bg-[#fffaf0]/90 shadow-[0_12px_30px_rgba(86,68,42,0.12)]">
                  <CardContent className="space-y-4 p-5">
                    {todayPreview.map((item, index) => <TimelineItem key={`${current.id}-${item.time}`} item={item} index={index} compact />)}
                    <div className="rounded-2xl bg-[#f4ead6] px-4 py-3 text-center text-sm tracking-widest text-[#8a755e]">還有 {Math.max(0, current.plan.length - 3)} 個行程</div>
                  </CardContent>
                </Card>
              </section>

              <section className="mt-7">
                <div className="mb-4 flex items-end justify-between"><h2 className="text-2xl font-bold tracking-widest">快速導航</h2><span className="font-serif italic tracking-[0.22em] text-[#aa8c66]">Map</span></div>
                <div className="space-y-3">{mapRoutes.slice(1, 3).map((route) => <RouteCard key={route.title} route={route} />)}</div>
              </section>
            </>
          )}

          {view === "schedule" && (
            <section>
              <div className="mb-4 flex items-end justify-between"><h2 className="text-2xl font-bold tracking-widest">每日行程</h2><span className="font-serif italic tracking-[0.22em] text-[#aa8c66]">Schedule</span></div>
              <div className="space-y-4">{current.plan.map((item, index) => <TimelineItem key={`full-${current.id}-${item.time}`} item={item} index={index} />)}</div>
              <button className="fixed bottom-24 right-[calc(50%-190px)] z-20 flex h-14 w-14 items-center justify-center rounded-full bg-[#3f372d] text-white shadow-xl"><Plus size={28} /></button>
            </section>
          )}

          {view === "map" && (
            <section>
              <div className="mb-4 flex items-end justify-between"><h2 className="text-2xl font-bold tracking-widest">地圖導航</h2><span className="font-serif italic tracking-[0.22em] text-[#aa8c66]">Route</span></div>
              <Card className="mb-5 rounded-[2rem] border-0 bg-[#3f372d] text-[#fff8ed] shadow-lg">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3"><Navigation className="text-[#e8d7b9]" /><h3 className="text-xl font-semibold">一鍵開啟 Google Maps</h3></div>
                  <p className="mt-3 text-sm leading-relaxed text-[#eadcc3]">每個行程卡片都有「從目前位置導航」；Google Maps 會依照即時位置、交通狀況與交通方式顯示預估時間。</p>
                </CardContent>
              </Card>
              <div className="space-y-3">{mapRoutes.map((route) => <RouteCard key={route.title} route={route} />)}</div>
            </section>
          )}

          {view === "spots" && (
            <section>
              <div className="mb-4 flex items-end justify-between"><h2 className="text-2xl font-bold tracking-widest">備用景點</h2><span className="font-serif italic tracking-[0.22em] text-[#aa8c66]">Backup</span></div>
              <div className="space-y-4">{backupSpots.map((spot) => <BackupSpotCard key={spot.name} spot={spot} />)}</div>
            </section>
          )}

          {view === "budget" && (
            <section>
              <div className="mb-4 flex items-end justify-between">
                <h2 className="text-2xl font-bold tracking-widest">記帳</h2>
                <span className="font-serif italic tracking-[0.22em] text-[#aa8c66]">
                  Budget
                </span>
              </div>

              <Card className="rounded-[2rem] border-0 bg-[#3f372d] p-0 text-[#fff8ed] shadow-lg">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-[#d8c6a6]">
                        TOTAL EXPENSE
                      </p>
                      <h2 className="mt-2 text-4xl font-semibold tracking-wide">
                        NT${totalExpense.toLocaleString()}
                      </h2>
                    </div>
                    <Wallet className="text-[#d8c6a6]" />
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#eadcc3]">
                    每新增一筆支出，下方會記錄花在哪裡、金額與付款人。
                  </p>
                </CardContent>
              </Card>

              <Card className="mt-5 rounded-[2rem] border-0 bg-[#fffaf0]/90 shadow-sm">
                <CardContent className="p-5">
                  <h3 className="mb-4 text-lg font-semibold tracking-widest text-[#4b4036]">
                    新增支出
                  </h3>

                  <form onSubmit={addExpense} className="space-y-3">
                    <input
                      value={expenseForm.item}
                      onChange={(event) =>
                        setExpenseForm((prev) => ({
                          ...prev,
                          item: event.target.value,
                        }))
                      }
                      placeholder="花在哪裡，例如：晚餐、客運、茶屋"
                      className="w-full rounded-2xl border border-[#e2d2b8] bg-white/70 px-4 py-3 text-sm outline-none focus:border-[#9b7a51]"
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        min="0"
                        value={expenseForm.amount}
                        onChange={(event) =>
                          setExpenseForm((prev) => ({
                            ...prev,
                            amount: event.target.value,
                          }))
                        }
                        placeholder="金額"
                        className="w-full rounded-2xl border border-[#e2d2b8] bg-white/70 px-4 py-3 text-sm outline-none focus:border-[#9b7a51]"
                      />

                      <input
                        value={expenseForm.payer}
                        onChange={(event) =>
                          setExpenseForm((prev) => ({
                            ...prev,
                            payer: event.target.value,
                          }))
                        }
                        placeholder="誰付的"
                        className="w-full rounded-2xl border border-[#e2d2b8] bg-white/70 px-4 py-3 text-sm outline-none focus:border-[#9b7a51]"
                      />
                    </div>

                    <div className="grid grid-cols-[1fr_auto] gap-3">
                      <select
                        value={expenseForm.category}
                        onChange={(event) =>
                          setExpenseForm((prev) => ({
                            ...prev,
                            category: event.target.value,
                          }))
                        }
                        className="w-full rounded-2xl border border-[#e2d2b8] bg-white/70 px-4 py-3 text-sm outline-none focus:border-[#9b7a51]"
                      >
                        <option>餐飲</option>
                        <option>交通</option>
                        <option>住宿</option>
                        <option>門票</option>
                        <option>伴手禮</option>
                        <option>其他</option>
                      </select>

                      <button
                        type="submit"
                        className="rounded-2xl bg-[#3f372d] px-5 py-3 text-sm font-semibold tracking-widest text-[#fff8ed]"
                      >
                        新增
                      </button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <section className="mt-5 space-y-3">
                <div className="flex items-end justify-between">
                  <h3 className="text-lg font-semibold tracking-widest text-[#4b4036]">
                    支出明細
                  </h3>
                  <span className="text-sm tracking-widest text-[#9b7a51]">
                    {expenses.length} 筆
                  </span>
                </div>

                {expenses.length === 0 ? (
                  <Card className="rounded-[1.6rem] border-0 bg-[#fffaf0]/90 shadow-sm">
                    <CardContent className="p-5 text-sm text-[#756757]">
                      目前還沒有支出紀錄。
                    </CardContent>
                  </Card>
                ) : (
                  expenses.map((expense) => (
                    <Card
                      key={expense.id}
                      className="rounded-[1.6rem] border-0 bg-[#fffaf0]/90 shadow-sm"
                    >
                      <CardContent className="flex items-center justify-between gap-4 p-5">
                        <div className="min-w-0">
                          <div className="flex flex-wrap gap-2">
                            <Tag>{expense.category}</Tag>
                            <Tag>{expense.payer} 付</Tag>
                          </div>

                          <h4 className="mt-3 text-lg font-semibold text-[#4b4036]">
                            {expense.item}
                          </h4>

                          <p className="mt-1 text-sm text-[#8a755e]">
                            NT${Number(expense.amount || 0).toLocaleString()}
                          </p>
                        </div>

                        <button
                          onClick={() => removeExpense(expense.id)}
                          className="shrink-0 rounded-full bg-[#efe6d3] px-3 py-2 text-xs tracking-widest text-[#6e5b45]"
                        >
                          刪除
                        </button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </section>
            </section>
          )}
        </main>

        <BottomNav view={view} setView={setView} />
      </div>
    </div>
  );
}
