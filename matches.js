export default {
    async fetch(request) {

        // مثال جلب مباريات من ScoreBat
        const res = await fetch("https://www.ysscores.com/ar/index");
        const data = await res.json();

        // ترتيب حسب الأهمية
        const matches = data.response.map(m => ({
            team1Name: m.title.split(" - ")[0],
            team2Name: m.title.split(" - ")[1],
            team1Logo: m.thumbnail,
            team2Logo: m.thumbnail,
            matchTime: m.date,
            status: "غير مباشر",
            tournament: m.competition,
            importance: m.competition.includes("CHAMPIONS") ? "high"
                       : m.competition.includes("WORLD") ? "high"
                       : m.competition.includes("EUROPE") ? "medium"
                       : "low"
        }));

        return new Response(JSON.stringify(matches), {
            headers: { "content-type": "application/json" }
        });
    }
}
