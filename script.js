//  Nav bar logics 
// 1. Places list   
  const places = [
  "Amsterdam", "Athens", "Agra", "Auckland",
  "Berlin", "Bangkok", "Barcelona", "Bali",
  "Chennai", "Chicago", "Colombo", "Coimbatore",
  "Delhi", "Dubai", "Dallas", "Darjeeling",
  "Edinburgh", "Egypt", "Erode", "Everest",
  "Florence", "France", "Frankfurt", "Fiji",
  "Goa", "Geneva", "Glasgow", "Greece",
  "Hyderabad", "Hawaii", "Hong Kong", "Houston",
  "Istanbul", "Indore", "Ibiza", "Iran",
  "Jaipur", "Japan", "Jakarta", "Jordan",
  "Kyoto", "Kolkata", "Kerala", "Kansas",
  "London", "Lisbon", "Las Vegas", "Lucknow",
  "Mumbai", "Mysore", "Madurai", "Melbourne",
  "New York", "Nice", "Naples", "Norway",
  "Oslo", "Ooty", "Orlando", "Oxford",
  "Paris", "Pune", "Prague", "Perth",
  "Quebec", "Qatar", "Queens", "Quito",
  "Rome", "Raleigh", "Rajasthan", "Russia",
  "Singapore", "Sydney", "Santorini", "Seoul",
  "Tokyo", "Toronto", "Tulum", "Thailand",
  "Udaipur", "Utrecht", "Uganda", "Ukraine",
  "Venice", "Vienna", "Vancouver", "Vietnam",
  "Warsaw", "Washington", "Wellington", "Wuhan",
  "Xiamen", "Xian", "Xalapa", "Xinjiang",
  "Yokohama", "Yercaud", "Yemen", "Yosemite",
  "Zurich", "Zagreb", "Zambia", "Zealand"
];

  function showSuggestions(value) {
    const box = document.getElementById('suggestionBox');

    // 2. Empty or short → hide dropdown
    if (value.length < 1) {
      box.classList.add('hidden');
      box.innerHTML = '';
      return;
    }

    // 3. Filter: typed text match avutunayi places filter chesatam
    const filtered = places.filter(place =>
      place.toLowerCase().startsWith(value.toLowerCase())
    );

    // 4. No match → hide
    if (filtered.length === 0) {
      box.classList.add('hidden');
      box.innerHTML = '';
      return;
    }

    // 5. Match unte → list build cheyyi
    box.innerHTML = filtered.map(place => `
      <li 
        onclick="selectPlace('${place}')"
        class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
        📍 ${place}
      </li>
    `).join('');

    box.classList.remove('hidden');
  }

  // 6. Click chesthe input lo set avutundi
  function selectPlace(place) {
    document.getElementById('whereInput').value = place;
    document.getElementById('suggestionBox').classList.add('hidden');
  }

  // 7. Outside click chesthe dropdown close avutundi
  document.addEventListener('click', function(e) {
    const input = document.getElementById('whereInput');
    const box = document.getElementById('suggestionBox');
    if (e.target !== input) {
      box.classList.add('hidden');
    }
  });



//  selecting calendar

// 1. Today's date track cheyyadam
  const today = new Date();
  let currentMonth = today.getMonth();   // 0 = January
  let currentYear  = today.getFullYear();

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  // 2. Calendar open/close toggle
  function toggleCalendar() {
    const box = document.getElementById('calendarBox');
    box.classList.toggle('hidden');
    renderCalendar();
  }


  // 3. Previous / Next month buttons
  function changeMonth(direction) {
    currentMonth += direction;

    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }

    renderCalendar();
  }

  // 4. Calendar days render cheyyadam
  function renderCalendar() {
    // Month + Year heading
    document.getElementById('monthYear').textContent =
      monthNames[currentMonth] + ' ' + currentYear;

    // First day of month (0=Sun, 1=Mon...)
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    // Total days in this month
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    let html = '';

    // Empty boxes before first day
    for (let i = 0; i < firstDay; i++) {
      html += `<div></div>`;
    }

    // Day buttons
    for (let day = 1; day <= totalDays; day++) {
      const isToday =
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();

      html += `
        <button
          onclick="selectDate(${day})"
          class="text-sm w-8 h-8 mx-auto rounded-full
            ${isToday
              ? 'bg-[#E41D58] text-white font-bold'
              : 'hover:bg-gray-100 text-gray-700'}
          ">
          ${day}
        </button>`;
    }

    document.getElementById('calendarDays').innerHTML = html;
  }

  // 5. Date select chesthe input lo show avutundi
  function selectDate(day) {
    const selected = new Date(currentYear, currentMonth, day);
    const formatted = selected.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });

    document.getElementById('dateInput').value = formatted;
    document.getElementById('calendarBox').classList.add('hidden');
  }

  // 6. Outside click chesthe calendar close avutundi
  document.addEventListener('click', function(e) {
    const box   = document.getElementById('calendarBox');
    const input = document.getElementById('dateInput');
    if (!box.contains(e.target) && e.target !== input) {
      box.classList.add('hidden');
    }
  });




 


// who code guest categories

const guests = [
    { label: "Adults",   desc: "Ages 13 or above",          count: 0 },
    { label: "Children", desc: "Ages 2–12",                  count: 0 },
    { label: "Infants",  desc: "Under 2",                    count: 0 },
    { label: "Pets",     desc: "Bringing a service animal?", count: 0, link: true },
  ];

  function toggleGuests() {
    const box = document.getElementById('guestBox');
    box.classList.toggle('hidden');
    renderGuests();
  }

  function increment(index) {
    guests[index].count++;
    renderGuests();
    updateGuestInput();
    event.stopPropagation(); // ← idi new line — popup close avvadam aapisthundi
  }

  function decrement(index) {
    if (guests[index].count > 0) {
      guests[index].count--;
    }
    renderGuests();
    updateGuestInput();
    event.stopPropagation(); // ← idi new line — popup close avvadam aapisthundi
  }

  function updateGuestInput() {
    const parts = guests
      .filter(g => g.count > 0)
      .map(g => `${g.count} ${g.label}`);
    document.getElementById('guestInput').value =
      parts.length > 0 ? parts.join(', ') : '';
  }

  function renderGuests() {
    const container = document.getElementById('guestRows');
    container.innerHTML = guests.map((g, i) => `
      <div class="flex items-center justify-between py-4 ${i < guests.length - 1 ? 'border-b border-gray-100' : ''}">
        <div>
          <p class="text-sm font-semibold text-gray-800">${g.label}</p>
          <p class="text-xs text-gray-400">${g.desc}</p>
        </div>
        <div class="flex items-center gap-3">
          <button
            onclick="decrement(${i})"
            class="w-8 h-8 rounded-full border border-gray-300 text-gray-500
              flex items-center justify-center text-lg
              ${g.count === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:border-gray-800 hover:text-gray-800'}">
            −
          </button>
          <span class="text-sm font-medium text-gray-800 w-4 text-center">${g.count}</span>
          <button
            onclick="increment(${i})"
            class="w-8 h-8 rounded-full border border-gray-300 text-gray-500
              flex items-center justify-center text-lg
              hover:border-gray-800 hover:text-gray-800">
            +
          </button>
        </div>
      </div>
    `).join('');
  }

  document.addEventListener('click', function(e) {
    const box   = document.getElementById('guestBox');
    const input = document.getElementById('guestInput');
    if (!box.contains(e.target) && e.target !== input) {
      box.classList.add('hidden');
    }
  });
















    // <!-- JS: Tab Active Logic -->
 
 function setActive(clickedTab) {
            // Anni tabs reset cheyyi
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.classList.remove('border-gray-800', 'text-gray-800', 'font-semibold');
                tab.classList.add('border-transparent', 'text-gray-600', 'font-medium');
            });

            // Clicked tab ki active styles add cheyyi
            clickedTab.classList.remove('border-transparent', 'text-gray-600', 'font-medium');
            clickedTab.classList.add('border-gray-800', 'text-gray-800', 'font-semibold');
        }

        // This is  footer code

        const data = {
            popular: [
                { city: "Dallas", type: "Villa rentals", url: "https://www.airbnb.co.in/dallas-tx/stays/villas" },
                { city: "North Myrtle Beach", type: "Holiday rentals", url: "https://www.airbnb.co.in/north-myrtle-beach-sc/stays" },
                { city: "Portland", type: "Flat rentals", url: "https://www.airbnb.co.in/portland-me/stays/apartments" },
                { city: "Nice", type: "Cottage rentals", url: "https://www.airbnb.co.in/nice-france/stays/cottages" },
                { city: "Cleveland", type: "Holiday rentals", url: "https://www.airbnb.co.in/cleveland-oh/stays" },
                { city: "Barcelona", type: "Villa rentals", url: "https://www.airbnb.co.in/barcelona-spain/stays/villas" },
                { city: "Galveston", type: "Cottage rentals", url: "https://www.airbnb.co.in/galveston-tx/stays/cottages" },
                { city: "Kauai", type: "Monthly Rentals", url: "https://www.airbnb.co.in/kauai-hi/stays/monthly" },
                { city: "Raleigh", type: "Monthly Rentals", url: "https://www.airbnb.co.in/raleigh-nc/stays/monthly" },
                { city: "Portland", type: "House rentals", url: "https://www.airbnb.co.in/portland-or/stays/houses" },
                { city: "Minneapolis", type: "Holiday rentals", url: "https://www.airbnb.co.in/minneapolis-mn/stays" },
                { city: "Amsterdam", type: "Monthly Rentals", url: "https://www.airbnb.co.in/amsterdam-netherlands/stays/monthly" },
                { city: "Philadelphia", type: "Monthly Rentals", url: "https://www.airbnb.co.in/philadelphia-pa/stays/monthly" },
                { city: "Orange Beach", type: "Villa rentals", url: "https://www.airbnb.co.in/orange-beach-al/stays/villas" },
                { city: "Gulf Shores", type: "House rentals", url: "https://www.airbnb.co.in/gulf-shores-al/stays/houses" },
                { city: "Tokyo", type: "Villa rentals", url: "https://www.airbnb.co.in/tokyo-japan/stays/villas" },
                { city: "St. Petersburg", type: "Holiday rentals", url: "https://www.airbnb.co.in/st-petersburg-fl/stays" },
                { city: "Canmore", type: "Holiday rentals", url: "https://www.airbnb.co.in/canmore-ab-canada/stays" },
                { city: "Marbella", type: "Villa rentals", url: "https://www.airbnb.co.in/marbella-spain/stays/villas" },
                { city: "Scottsdale", type: "Holiday rentals", url: "https://www.airbnb.co.in/scottsdale-az/stays" },
                { city: "Tulum", type: "Holiday rentals", url: "https://www.airbnb.co.in/tulum-mexico/stays" },
                { city: "Kissimmee", type: "Holiday rentals", url: "https://www.airbnb.co.in/kissimmee-fl/stays" },
                { city: "Playa del Carmen", type: "Holiday rentals", url: "https://www.airbnb.co.in/playa-del-carmen-mexico/stays" },
                { city: "Bali", type: "Villa rentals", url: "https://www.airbnb.co.in/bali-indonesia/stays/villas" },
            ],
            beach: [
                { city: "Rosarito Beach", type: "Pet-friendly rentals", url: "https://www.airbnb.co.in/rosarito-beach-mexico/stays/pet-friendly" },
                { city: "Long Branch Beach", type: "Beachfront rentals", url: "https://www.airbnb.co.in/long-branch-beach-nj/stays/beachfront" },
                { city: "Carmel Beach", type: "Flat rentals", url: "https://www.airbnb.co.in/carmel-beach-carmel-by-the-sea-ca/stays/apartments" },
                { city: "North Beach", type: "Flat rentals", url: "https://www.airbnb.co.in/playa-norte-isla-mujeres-mexico/stays/apartments" },
                { city: "Bridgetown", type: "Villa rentals", url: "https://www.airbnb.co.in/bridgetown-barbados/stays/villas" },
                { city: "Belmar Beach", type: "Flat rentals", url: "https://www.airbnb.co.in/belmar-beach-nj/stays/apartments" },
                { city: "Seacrest Beach", type: "Villa rentals", url: "https://www.airbnb.co.in/seacrest-beach-panama-city-beach-fl/stays/villas" },
                { city: "Cabo San Lucas", type: "Monthly Rentals", url: "https://www.airbnb.co.in/cabo-san-lucas-mexico/stays/monthly" },
                { city: "Bradley Beach", type: "Holiday rentals", url: "https://www.airbnb.co.in/bradley-beach-nj/stays" },
                { city: "Misquamicut State Beach", type: "Holiday rentals", url: "https://www.airbnb.co.in/misquamicut-state-beach-ri/stays" },
                { city: "Punta Rucia", type: "Holiday rentals", url: "https://www.airbnb.co.in/punta-rucia-dominican-republic/stays" },
                { city: "Pipa Beach", type: "Pet-friendly rentals", url: "https://www.airbnb.co.in/tibau-do-sul-brazil/stays/pet-friendly" },
                { city: "Bean Point Beach", type: "Holiday rentals", url: "https://www.airbnb.co.in/bean-point-beach-anna-maria-fl/stays" },
                { city: "Grace Bay Beach", type: "Flat rentals", url: "https://www.airbnb.co.in/grace-bay-beach-turks-and-caicos-islands/stays/apartments" },
                { city: "Bingin Beach", type: "Villa rentals", url: "https://www.airbnb.co.in/bingin-beach-indonesia/stays/villas" },
                { city: "Buyé Beach", type: "Holiday rentals", url: "https://www.airbnb.co.in/buye-beach-cabo-rojo-puerto-rico/stays" },
                { city: "An Bang Beach", type: "Holiday rentals", url: "https://www.airbnb.co.in/an-bang-beach-vietnam/stays" },
                { city: "Mykonos", type: "Villa rentals", url: "https://www.airbnb.co.in/mykonos-greece/stays/villas" },
                { city: "Santorini", type: "Holiday rentals", url: "https://www.airbnb.co.in/santorini-greece/stays" },
                { city: "Maldives", type: "Holiday rentals", url: "https://www.airbnb.co.in/maldives/stays" },
            ],
            arts: [
                { city: "Paris", type: "Flat rentals", url: "https://www.airbnb.co.in/paris-france/stays/apartments" },
                { city: "Florence", type: "Holiday rentals", url: "https://www.airbnb.co.in/florence-italy/stays" },
                { city: "Vienna", type: "Holiday rentals", url: "https://www.airbnb.co.in/vienna-austria/stays" },
                { city: "Prague", type: "Holiday rentals", url: "https://www.airbnb.co.in/prague-czech-republic/stays" },
                { city: "Rome", type: "Flat rentals", url: "https://www.airbnb.co.in/rome-italy/stays/apartments" },
                { city: "Amsterdam", type: "Canal house rentals", url: "https://www.airbnb.co.in/amsterdam-netherlands/stays" },
                { city: "New York", type: "Holiday rentals", url: "https://www.airbnb.co.in/new-york-ny/stays" },
                { city: "Edinburgh", type: "Holiday rentals", url: "https://www.airbnb.co.in/edinburgh-scotland/stays" },
                { city: "Istanbul", type: "Holiday rentals", url: "https://www.airbnb.co.in/istanbul-turkey/stays" },
                { city: "Kyoto", type: "House rentals", url: "https://www.airbnb.co.in/kyoto-japan/stays/houses" },
                { city: "Lisbon", type: "Flat rentals", url: "https://www.airbnb.co.in/lisbon-portugal/stays/apartments" },
                { city: "Berlin", type: "Holiday rentals", url: "https://www.airbnb.co.in/berlin-germany/stays" },
            ],
            mountains: [
                { city: "Aspen", type: "Holiday rentals", url: "https://www.airbnb.co.in/aspen-co/stays" },
                { city: "Whistler", type: "Holiday rentals", url: "https://www.airbnb.co.in/whistler-bc-canada/stays" },
                { city: "Banff", type: "Holiday rentals", url: "https://www.airbnb.co.in/banff-ab-canada/stays" },
                { city: "Breckenridge", type: "Holiday rentals", url: "https://www.airbnb.co.in/breckenridge-co/stays" },
                { city: "Lake Tahoe", type: "Cabin rentals", url: "https://www.airbnb.co.in/lake-tahoe/stays/cabins" },
                { city: "Vail", type: "Holiday rentals", url: "https://www.airbnb.co.in/vail-co/stays" },
                { city: "Jackson Hole", type: "Holiday rentals", url: "https://www.airbnb.co.in/jackson-hole-wy/stays" },
                { city: "Chamonix", type: "Holiday rentals", url: "https://www.airbnb.co.in/chamonix-france/stays" },
                { city: "Queenstown", type: "Holiday rentals", url: "https://www.airbnb.co.in/queenstown-new-zealand/stays" },
                { city: "Zermatt", type: "Holiday rentals", url: "https://www.airbnb.co.in/zermatt-switzerland/stays" },
                { city: "Innsbruck", type: "Holiday rentals", url: "https://www.airbnb.co.in/innsbruck-austria/stays" },
                { city: "Interlaken", type: "Holiday rentals", url: "https://www.airbnb.co.in/interlaken-switzerland/stays" },
            ],
            outdoors: [
                { city: "Yosemite", type: "Cabin rentals", url: "https://www.airbnb.co.in/yosemite-national-park-ca/stays/cabins" },
                { city: "Sedona", type: "Holiday rentals", url: "https://www.airbnb.co.in/sedona-az/stays" },
                { city: "Moab", type: "Holiday rentals", url: "https://www.airbnb.co.in/moab-ut/stays" },
                { city: "Asheville", type: "Holiday rentals", url: "https://www.airbnb.co.in/asheville-nc/stays" },
                { city: "Big Sur", type: "Holiday rentals", url: "https://www.airbnb.co.in/big-sur-ca/stays" },
                { city: "Glacier", type: "Holiday rentals", url: "https://www.airbnb.co.in/glacier-national-park-mt/stays" },
                { city: "Yellowstone", type: "Holiday rentals", url: "https://www.airbnb.co.in/yellowstone/stays" },
                { city: "Joshua Tree", type: "Holiday rentals", url: "https://www.airbnb.co.in/joshua-tree-ca/stays" },
                { city: "Iceland", type: "Holiday rentals", url: "https://www.airbnb.co.in/iceland/stays" },
                { city: "Patagonia", type: "Holiday rentals", url: "https://www.airbnb.co.in/patagonia/stays" },
                { city: "Costa Rica", type: "Villa rentals", url: "https://www.airbnb.co.in/costa-rica/stays/villas" },
                { city: "Cape Town", type: "Holiday rentals", url: "https://www.airbnb.co.in/cape-town-south-africa/stays" },
            ],
            things: [
                { city: "Las Vegas", type: "Holiday rentals", url: "https://www.airbnb.co.in/las-vegas-nv/stays" },
                { city: "Orlando", type: "Holiday rentals", url: "https://www.airbnb.co.in/orlando-fl/stays" },
                { city: "Nashville", type: "Holiday rentals", url: "https://www.airbnb.co.in/nashville-tn/stays" },
                { city: "New Orleans", type: "Holiday rentals", url: "https://www.airbnb.co.in/new-orleans-la/stays" },
                { city: "Chicago", type: "Holiday rentals", url: "https://www.airbnb.co.in/chicago-il/stays" },
                { city: "San Francisco", type: "Holiday rentals", url: "https://www.airbnb.co.in/san-francisco-ca/stays" },
                { city: "London", type: "Flat rentals", url: "https://www.airbnb.co.in/london-england/stays/apartments" },
                { city: "Dubai", type: "Holiday rentals", url: "https://www.airbnb.co.in/dubai-united-arab-emirates/stays" },
                { city: "Singapore", type: "Holiday rentals", url: "https://www.airbnb.co.in/singapore/stays" },
                { city: "Bangkok", type: "Holiday rentals", url: "https://www.airbnb.co.in/bangkok-thailand/stays" },
                { city: "Cancún", type: "Holiday rentals", url: "https://www.airbnb.co.in/cancun-mexico/stays" },
                { city: "Sydney", type: "Holiday rentals", url: "https://www.airbnb.co.in/sydney-australia/stays" },
                { city: "Tokyo", type: "Holiday rentals", url: "https://www.airbnb.co.in/tokyo-japan/stays" },
                { city: "Miami", type: "Holiday rentals", url: "https://www.airbnb.co.in/miami-fl/stays" },
                { city: "Mexico City", type: "Holiday rentals", url: "https://www.airbnb.co.in/mexico-city-mexico/stays" },
            ]
        };

        const ITEMS_PER_PAGE = 18;
        let currentTab = 'popular';
        let expanded = false;

        function switchTab(tab) {
            currentTab = tab;
            expanded = false;

            const tabs = {
                popular: 'tab-popular', arts: 'tab-arts', beach: 'tab-beach',
                mountains: 'tab-mountains', outdoors: 'tab-outdoors', things: 'tab-things'
            };

            Object.entries(tabs).forEach(([key, id]) => {
                const el = document.getElementById(id);
                if (key === tab) {
                    el.className = 'tab-btn px-4 py-3 text-sm font-semibold text-gray-900 border-b-2 border-gray-900 whitespace-nowrap';
                } else {
                    el.className = 'tab-btn px-4 py-3 text-sm font-normal text-gray-500 border-b-2 border-transparent hover:text-gray-900 whitespace-nowrap transition-colors';
                }
            });

            renderGrid();
        }

        function toggleShowMore() {
            expanded = !expanded;
            renderGrid();
        }

        function renderGrid() {
            const items = data[currentTab] || [];
            const visible = expanded ? items : items.slice(0, ITEMS_PER_PAGE);
            const area = document.getElementById('content-area');

            area.innerHTML = visible.map(item => `
        <a href="${item.url}" target="_blank" class="group block">
          <p class="text-sm font-semibold text-gray-900 group-hover:underline leading-snug">${item.city}</p>
          <p class="text-sm text-gray-500 mt-0.5">${item.type}</p>
        </a>
      `).join('');

            const wrapper = document.getElementById('show-more-wrapper');
            const btn = document.getElementById('show-more-btn');

            if (items.length > ITEMS_PER_PAGE) {
                wrapper.classList.remove('hidden');
                btn.innerHTML = expanded
                    ? `Show less <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>`
                    : `Show more <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>`;
            } else {
                wrapper.classList.add('hidden');
            }
        }

        renderGrid();




        //Bottom footer code

        const footerData = [
            {
                heading: "Support",
                links: [
                    { label: "Help Centre", href: "#" },
                    { label: "Get help with a safety issue", href: "#" },
                    { label: "AirCover", href: "#" },
                    { label: "Anti-discrimination", href: "#" },
                    { label: "Disability support", href: "#" },
                    { label: "Cancellation options", href: "#" },
                    { label: "Report neighbourhood concern", href: "#" },
                ]
            },
            {
                heading: "Hosting",
                links: [
                    { label: "Airbnb your home", href: "#" },
                    { label: "Airbnb your experience", href: "#" },
                    { label: "Airbnb your service", href: "#" },
                    { label: "AirCover for Hosts", href: "#" },
                    { label: "Hosting resources", href: "#" },
                    { label: "Community forum", href: "#" },
                    { label: "Hosting responsibly", href: "#" },
                    { label: "Join a free hosting class", href: "#" },
                    { label: "Find a co-host", href: "#" },
                    { label: "Refer a host", href: "#" },
                ]
            },
            {
                heading: "Airbnb",
                links: [
                    { label: "2025 Summer Release", href: "#" },
                    { label: "Newsroom", href: "#" },
                    { label: "Careers", href: "#" },
                    { label: "Investors", href: "#" },
                    { label: "Airbnb.org emergency stays", href: "#" },
                ]
            }
        ];

        const container = document.getElementById('footer-links');

        container.innerHTML = footerData.map(section => `
      <div>
        <h3 class="text-sm font-bold text-gray-900 mb-4">${section.heading}</h3>
        <ul class="space-y-3">
          ${section.links.map(link => `
            <li>
              <a href="${link.href}"
                class="text-sm text-gray-700 hover:underline hover:text-gray-900 transition-colors">
                ${link.label}
              </a>
            </li>
          `).join('')}
        </ul>
      </div>
    `).join('');