// // now i need to make cards and using api need to insert it in the cards id div

const URL = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const parentCards = document.getElementById('cards');

const fetchingData = async () => {
    const response = await fetch(URL);
    const convertTOjson = await response.json();
    const data = convertTOjson;
    useData(data);
}

// Status conditional func
const statusCard = (s) => {
    if (s.toLowerCase() === "open") {
        return `<img src="assets/Open-Status.png" alt="" class="w-6 h-6">`;
    } else if (s.toLowerCase() === "closed") {
        return `<img src="assets/Closed- Status .png" alt="" class="w-6 h-6">`;
    }
}

// Priority conditional func
const priorityCard = (p) => {
    if (p.toLowerCase() === "high") {
        return `<p class="bg-[#FEECEC] text-[#EF4444] w-20 h-6 text-center rounded-xl text-[12px] place-content-center">HIGH</p>`;
    } else if (p.toLowerCase() === "medium") {
        return `<p class="bg-[#FFF6D1] text-[#F59E0B] w-20 h-6 text-center rounded-xl text-[12px] place-content-center">MEDIUM</p>`;
    } else if (p.toLowerCase() === "low") {
        return `<p class="bg-[#EEEFF2] text-[#9CA3AF] w-20 h-6 text-center rounded-xl text-[12px] place-content-center">LOW</p>`;
    }
}

// Labels conditional func
const labelCard = (l) => {
    return l.map(el => {
        const lowerEL = el.toLowerCase();

        if (lowerEL === "bug") {
            return `<p class="bg-[#FEECEC] text-[#EF4444] w-20 h-6 text-center rounded-xl text-[12px] place-content-center border-[#FECACA] border">
                        <i class="fa-solid fa-bug"></i>
                        <span>BUG</span>
                    </p>`;
        } else if (lowerEL === "help wanted") {
            return `<p class="bg-[#FFF6D1] text-[#F59E0B] w-28 h-6 text-center rounded-xl text-[12px] place-content-center border-[#FDE68A] border">
                        <i class="fa-regular fa-life-ring"></i>
                        <span>HELP WANTED</span>
                    </p>`;
        } else if (lowerEL === "enhancement") {
            return `<p class="bg-[#BBF7D0] text-[#00A96E] w-30 h-6 text-center rounded-xl text-[12px] place-content-center border-[#00A96E] border">
                        <i class="fa-regular fa-star"></i>
                        <span>ENHANCEMENT</span>
                    </p>`;
        } else if (lowerEL === "good first issue") {
            return `<p class="bg-[#BBF7D0] text-[#00A96E] w-38 h-6 text-center rounded-xl text-[12px] place-content-center border-[#00A96E] border">
                        <i class="fa-regular fa-star"></i>
                        <span>GOOD FIRST ISSUE</span>
                    </p>`;
        } else if (lowerEL === "documentation") {
            return `<p class="bg-[#BBF7D0] text-[#00A96E] w-32 h-6 text-center rounded-xl text-[12px] place-content-center border-[#00A96E] border">
                        <i class="fa-regular fa-star"></i>
                        <span>DOCUMENTATION</span>
                    </p>`;
        }
        return '';
    }).join('');
}

// display cards
const useData = (d) => {
    const cardsData = d.data;

    // Create all cards
    Object.entries(cardsData).forEach(([key, value]) => {
        const cardData = value;
        
        if (cardData.status === "open" || cardData.status === "closed") {
            const div = document.createElement('div');
            
            const borderColor = cardData.status === "open" ? "#00A96E" : "#A855F7";
            
            div.innerHTML = `
    <div class="w-full h-full min-h-64 rounded-sm shadow-md border-t-4 card" style="border-top-color: ${borderColor}" data-status="${cardData.status}">
        <div class="flex flex-col gap-3 p-4 border-b border-b-[#E4E4E7]">
            <div class="flex place-content-between">
                ${statusCard(cardData.status)}
                ${priorityCard(cardData.priority)}
            </div>
            <div class="flex flex-col gap-3">
                <div class="flex flex-col gap-2">
                    <h4 class="font-semibold text-[14px]">${cardData.title}</h4>
                    <p class="text-gray-500 text-[12px]">${cardData.description}</p>
                </div>
                <div class="flex gap-1 flex-wrap">
                    ${labelCard(cardData.labels)}
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-2 p-4">
            <p class="text-[12px] text-[#64748B]">${cardData.author}</p> 
            <p class="text-[12px] text-[#64748B]">${cardData.createdAt.split('T')[0]}</p> 
        </div>
    </div>
            `;
            
            parentCards.append(div.firstElementChild);
        }
    });
    
    updateCardCount();
}

const whichClicked = () => {
    const btnParent = document.getElementById('btn-parent');

    btnParent.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            clickedBtn(e.target);
        }
    });
};

const clickedBtn = (c) => {
    const allBtn = document.querySelectorAll('#btn-parent button');

    allBtn.forEach(btn => {
        btn.classList.remove('!text-white', '!bg-[#4A00FF]', 'active');
        btn.classList.add('text-gray-600', 'bg-white');
    });
    
    c.classList.remove('text-gray-600', 'bg-white');
    c.classList.add('!text-white', '!bg-[#4A00FF]', 'active');
    
    filterCards();
    updateCardCount();
}

const allBtnActive = () => {
    const allBtn = document.getElementById('all-btn');
    if (allBtn) {
        allBtn.classList.remove('text-gray-600', 'bg-white');
        allBtn.classList.add('!text-white', '!bg-[#4A00FF]', 'active');
    }
};

// active button
const filterCards = () => {
    const activeBtn = document.querySelector('.active');
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        // learned a new thing u can now access data where html has data-status in js it is dataset.status
        const cardStatus = card.dataset.status;
        
        if (activeBtn.innerText.toLowerCase() === 'all' || 
            cardStatus.toLowerCase() === activeBtn.innerText.toLowerCase()) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
};

// Update cardcount
const updateCardCount = () => {
    const activeBtn = document.querySelector('.active');
    const lenofCards = document.getElementById('lenofCards');
    const cards = document.querySelectorAll('.card');
    
    if (activeBtn.innerText.toLowerCase() === 'all') {
        lenofCards.innerText = cards.length;
    } else {
        // arry from is uses to convert nodelists into a array, we need this as array cuz we're gonna filter it we cant filter through nodelist
        const visibleCards = Array.from(cards).filter(card => 
            card.dataset.status.toLowerCase() === activeBtn.innerText.toLowerCase()
        );
        lenofCards.innerText = visibleCards.length;
    }
};

whichClicked();
allBtnActive();
fetchingData();
// // need to work with the search option

// // have to work with modals

// // new issue btn optional i think








