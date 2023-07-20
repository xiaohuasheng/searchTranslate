let translateTimeout;

function translateSearchQuery(searchQuery) {
    const url = "https://aip.baidubce.com/rpc/2.0/mt/texttrans/v1?access_token=24.a381098f60e314362d4c1daaa3d069c1.2592000.1690469069.282335-35292578"; // 请将your-access-token替换为您自己的访问令牌

    const payload = {
        from: "zh",
        to: "en",
        q: searchQuery
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            const translatedQuery = response.result.trans_result[0].dst;
            const searchInput = document.querySelector('textarea[name="q"]');
            if (searchInput) {
                searchInput.value = translatedQuery;
            }
        }
    };

    xhr.send(JSON.stringify(payload));
}

const searchInput = document.querySelector('textarea[name="q"]');
if (searchInput) {
    searchInput.addEventListener("input", function (event) {
        const searchQuery = searchInput.value;
        console.log("Search query:", searchQuery);
        // 如果searchQuery包含tt, 则翻译
        if (searchQuery.includes("，")) {
            // 去掉tt
            const searchQueryWithoutTt = searchQuery.replace("，", "");
            translateSearchQuery(searchQueryWithoutTt);
        }
    });
}