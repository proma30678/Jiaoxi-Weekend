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
    weekday: "SAT",
    date: "30",
    month: "05月",
    title: "礁溪小旅行",
    subtitle: "台北 → 礁溪",
    dayLabel: "Day 1 / 2",
    plan: [
      {
        time: "17:00",
        title: "台大出發",
        place: "台灣大學",
        area: "台北",
        tag: "交通",
        icon: Bus,
        note: "前往科技大樓站，搭客運往礁溪。週六建議預留 60–80 分鐘。",
        destination: "台灣大學",
        mode: "transit",
      },
      {
        time: "18:30",
        title: "抵達礁溪轉運站",
        place: "礁溪轉運站",
        area: "礁溪",
        tag: "交通",
        icon: MapPin,
        note: "步行(16mins)或短程叫車(5mins)前往偶浴礁溪溫泉旅店。",
        destination: "礁溪轉運站",
        mode: "transit",
      },
      {
        time: "19:00",
        title: "入住偶浴礁溪溫泉旅店",
        place: "宜蘭縣礁溪鄉仁愛路 27 號",
        area: "住宿",
        tag: "泡湯",
        icon: Hotel,
        note: "先來個雷霆守序XDD，確認房間沒問題後再出門晃晃。",
        destination: "偶浴礁溪溫泉旅店",
        mode: "walking",
      },
      {
        time: "19:30",
        title: "礁溪市區晚餐",
        place: "湯圍溝周邊",
        area: "礁溪",
        tag: "晚餐",
        icon: Utensils,
        note: "建議選市區小吃或輕鬆餐廳，不安排太遠的餐廳。",
        destination: "礁溪晚餐",
        mode: "walking",
      },
      {
        time: "20:40",
        title: "湯圍溝散步",
        place: "湯圍溝溫泉公園",
        area: "礁溪",
        tag: "散步",
        icon: Map,
        note: "晚餐後散步、買飲料甜點，節奏放慢。",
        destination: "湯圍溝溫泉公園",
        mode: "walking",
      },
      {
        time: "21:30",
        title: "回房泡湯",
        place: "偶浴房內湯池",
        area: "住宿",
        tag: "泡湯",
        icon: Waves,
        note: "再來個旋風守序，中間休息補水，避免泡/砲太久哈哈哈。",
        destination: "偶浴礁溪溫泉旅店",
        mode: "walking",
      },
    ],
  },
  {
    id: 2,
    weekday: "SUN",
    date: "31",
    month: "05月",
    title: "日光山茶屋",
    subtitle: "礁溪 → 台北",
    dayLabel: "Day 2 / 2",
    plan: [
      {
        time: "08:00",
        title: "起床與簡單早餐",
        place: "偶浴礁溪溫泉旅店",
        area: "住宿",
        tag: "早餐",
        icon: Coffee,
        note: "不建議早餐排太滿，保留時間退房與前往茶屋。",
        destination: "偶浴礁溪溫泉旅店",
        mode: "walking",
      },
      {
        time: "09:00",
        title: "退房或寄放行李",
        place: "偶浴櫃台",
        area: "住宿",
        tag: "退房",
        icon: Hotel,
        note: "若可寄放行李，先寄放再搭車去日光山茶屋。",
        destination: "偶浴礁溪溫泉旅店",
        mode: "walking",
      },
      {
        time: "09:15",
        title: "前往日光山茶屋",
        place: "計程車約 8–10 分鐘",
        area: "礁溪",
        tag: "交通",
        icon: Navigation,
        note: "中午前要回台北，不建議步行前往。",
        destination: "日光山茶屋",
        mode: "driving",
      },
      {
        time: "09:30",
        title: "日光山茶屋",
        place: "宜蘭縣礁溪鄉興農路 322 巷 6 號",
        area: "茶屋",
        tag: "主行程",
        icon: Coffee,
        note: "建議預約 09:00 或 09:30，拍照與喝茶時間較從容。",
        destination: "日光山茶屋",
        mode: "driving",
      },
      {
        time: "10:45",
        title: "返回礁溪轉運站",
        place: "可先回偶浴拿行李",
        area: "礁溪",
        tag: "交通",
        icon: Bus,
        note: "若行李隨身，直接前往轉運站。",
        destination: "礁溪轉運站",
        mode: "driving",
      },
      {
        time: "11:10",
        title: "搭客運回台北",
        place: "礁溪轉運站 → 台北",
        area: "台北",
        tag: "回程",
        icon: Bus,
        note: "回程建議預留排隊與候車時間。",
        destination: "礁溪轉運站",
        mode: "transit",
      },
    ],
  },
];

const backupSpots = [
  { name: "林北烤好", type: "晚餐備案", time: "約 60–90 分鐘", desc: "若想吃比較有氣氛的晚餐，可作為週六晚餐備案；建議先查候位狀況。", icon: Utensils, destination: "林北烤好 礁溪", mode: "driving" },
  { name: "買醉串燒酒場 德陽店", type: "宵夜備案", time: "約 60 分鐘", desc: "晚餐後還想小酌或吃宵夜時可考慮，距離礁溪市區較順。", icon: Utensils, destination: "買醉串燒酒場 德陽店", mode: "driving" },
  { name: "樂山溫泉拉麵", type: "晚餐備案", time: "約 45–60 分鐘", desc: "礁溪特色餐點，適合想吃簡單又有記憶點的晚餐。", icon: Utensils, destination: "樂山溫泉拉麵", mode: "walking" },
  { name: "礁溪溫泉廣場", type: "散步備案", time: "約 20–30 分鐘", desc: "若湯圍溝人太多，可改成附近短程散步點。", icon: Map, destination: "礁溪溫泉廣場", mode: "walking" },
  { name: "甲鳥園", type: "週日備案", time: "約 60–90 分鐘", desc: "若日光山茶屋訂不到早上時段，可改成輕鬆互動景點。", icon: Star, destination: "甲鳥園", mode: "driving" },
  { name: "跑馬古道公園", type: "自然備案", time: "約 40–60 分鐘", desc: "天氣好、想看山景時可加入；若下雨則不建議。", icon: Map, destination: "跑馬古道公園", mode: "driving" },
];

const mapRoutes = [
  { title: "台大 → 礁溪轉運站", subtitle: "週六出發交通", icon: Bus, origin: "台灣大學", destination: "礁溪轉運站", mode: "transit" },
  { title: "礁溪轉運站 → 偶浴", subtitle: "抵達後前往住宿", icon: Hotel, origin: "礁溪轉運站", destination: "偶浴礁溪溫泉旅店", mode: "walking" },
  { title: "偶浴 → 日光山茶屋", subtitle: "週日上午主行程", icon: Coffee, origin: "偶浴礁溪溫泉旅店", destination: "日光山茶屋", mode: "driving" },
  { title: "日光山茶屋 → 礁溪轉運站", subtitle: "回程銜接客運", icon: Navigation, origin: "日光山茶屋", destination: "礁溪轉運站", mode: "driving" },
];

const notes = [
  "住宿備註：一大床、禁菸房、房內獨立溫泉湯池、較安靜乾淨的房間。",
  "日光山茶屋建議預約 09:00 或 09:30，避免壓縮回程時間。",
  "週六晚餐以羅東為主，To be continue...",
  "泡湯每次 10–15 分鐘，中間補水休息，避免飯後立刻泡太久。",
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
      <p className="font-serif text-lg italic tracking-[0.25em] text-[#b08d63]">Jiaoxi Weekend</p>
      <h1 className="mt-4 font-serif text-5xl font-semibold tracking-wide text-[#4a4037]">礁溪 遊記</h1>
      <p className="mt-3 text-sm tracking-[0.18em] text-[#9a7f5d]">蕉吸一泊二食，看看30cm的真面目</p>
    </header>
  );
}

export default function JiaoxiCoupleTripSite() {
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
                <p className="mt-3 text-sm leading-relaxed text-[#66594d]">每日行程、備用景點與 Google Maps 導航都整理在下方。點「從目前位置導航」會以手機當前位置作為起點，抵達時間由 Google Maps 即時估算。</p>
              </section>

              <section className="mt-7">
                <div className="mb-4 flex items-end justify-between"><h2 className="text-2xl font-bold tracking-widest">今日行程</h2><button onClick={() => setView("schedule")} className="text-sm tracking-widest text-[#9b7a51]">查看全部 ›</button></div>
                <Card className="rounded-[2rem] border-0 bg-[#fffaf0]/90 shadow-[0_12px_30px_rgba(86,68,42,0.12)]">
                  <CardContent className="space-y-4 p-5">
                    {todayPreview.map((item, index) => <TimelineItem key={`${current.id}-${item.time}`} item={item} index={index} compact />)}
                    <div className="rounded-2xl bg-[#f4ead6] px-4 py-3 text-center text-sm tracking-widest text-[#8a755e]">還有 {current.plan.length - 3} 個行程</div>
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
