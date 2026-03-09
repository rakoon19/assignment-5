// // now i need to make cards and using api need to insert it in the cards id div

const URL = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const parentCards = document.getElementById('cards');

// loading screen
let timer;

const spinner = (loading) => {
    const spinnerEl = document.getElementById('spinner');
    
    if (loading) {
        timer = setTimeout(function() {
            spinnerEl.classList.remove('hidden');
        }, 200);
    } else {
        clearTimeout(timer);
        spinnerEl.classList.add('hidden');
    }
}

const fetchingData = async () => {
    spinner(true);
    const response = await fetch(URL);
    const convertTOjson = await response.json();
    const data = convertTOjson;
    useData(data);
    updateCardCount();
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
            return `<p class="bg-[#DBEAFE] text-[#2563EB] w-38 h-6 text-center rounded-xl text-[12px] place-content-center border-[#93C5FD] border">
                        <i class="fa-regular fa-thumbs-up"></i>
                        <span>GOOD FIRST ISSUE</span>
                    </p>`;
        } else if (lowerEL === "documentation") {
            return `<p class="bg-[#E9D5FF] text-[#9333EA] w-32 h-6 text-center rounded-xl text-[12px] place-content-center border-[#C084FC] border">
                        <i class="fa-solid fa-book"></i>
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

            const modalStatus = cardData.status === "open" ? `<p class="bg-[#00A96E] text-white w-20 h-6 text-center rounded-xl text-[12px] place-content-center border-[#BBF7D0] border">
            Opened
        </p>` : `<p class="bg-[#EF4444] text-white w-20 h-6 text-center rounded-xl text-[12px] place-content-center border-[#FECACA] border">
            Closed
        </p>`;
    
div.innerHTML = `
    <div class="w-full h-full min-h-64 rounded-sm shadow-md border-t-4 card cursor-pointer" 
         style="border-top-color: ${borderColor}" 
         data-status="${cardData.status}"
         data-modal-id="my_modal_${cardData.id}">
            
        <dialog id="my_modal_${cardData.id}" class="modal cursor-text">
            <div class="modal-box p-8 max-h-none">
                <h3 class="text-[24px] font-bold mb-4">${cardData.title}</h3>
                
                <div class="flex items-center gap-2 mb-4">
                    ${modalStatus}
                    <span class="text-gray-400">•</span>
                    <p class="text-sm text-gray-500">${cardData.status === 'open' ? 'Opened' : 'Closed'} by ${cardData.author}</p>
                    <span class="text-gray-400">•</span>
                    <p class="text-sm text-gray-500">${cardData.createdAt.split('T')[0]}</p>
                </div>

                <div class="flex gap-2 flex-wrap mb-4">
                    ${labelCard(cardData.labels)}
                </div>
                
                <p class="py-4 text-gray-700">${cardData.description}</p>
                
                <div class="bg-[#F8FAFC] rounded-lg p-4 mb-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-[4px]">
                            <p class="text-sm font-semibold text-gray-600">Assignee:</p>
                            <p class="text-sm text-gray-900 font-bold">${cardData.author}</p>
                        </div>
                        <div class="space-y-[4px]">
                            <p class="text-sm font-semibold text-gray-600">Priority:</p>
                            ${priorityCard(cardData.priority)}
                        </div>
                    </div>
                </div>
                
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn text-white bg-[#4A00FF] border-0">Close</button>
                    </form>
                </div>
            </div>
        </dialog>

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
    spinner(false);

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
//need to work with the search option
const searchDaValue = async() => {
    const search = document.getElementById('search');
    const mobileSearch = document.getElementById('search-mobile');
    const searchValue = search.value || mobileSearch.value;
    
    if (!searchValue.trim()) {
        parentCards.innerHTML = '';
        fetchingData();
        return;
    }
    
    const activeBtn = document.querySelector('.active');
    const currentFilter = activeBtn ? activeBtn.innerText.toLowerCase() : 'all';
    
    const URL = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`;
    
    spinner(true);
    parentCards.innerHTML = ''; 
    
    const res = await fetch(URL);
    const data = await res.json();
    
    if (data.data && Object.keys(data.data).length > 0) {
        useData(data);
        filterCards();
        updateCardCount();
    } else {
        spinner(false);
        parentCards.innerHTML = '<p class="text-center text-gray-500 col-span-full">No results found</p>';
        document.getElementById('lenofCards').innerText = 0;
    }
}
// mobile search
const mobileSearchBtn = document.getElementById('mobile-search-btn');
const mobileSearchBar = document.getElementById('mobile-search');
const mobileSearchInput = document.getElementById('search-mobile');

mobileSearchBtn.addEventListener('click', function() {
    mobileSearchBar.classList.toggle('hidden');
    const icon = mobileSearchBtn.querySelector('i');
    
    if (mobileSearchBar.classList.contains('hidden')) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-magnifying-glass');
        mobileSearchInput.value = '';
        allBtnActive();
        parentCards.innerHTML = '';
        fetchingData();
    } else {
        icon.classList.remove('fa-magnifying-glass');
        icon.classList.add('fa-xmark');
        mobileSearchInput.focus();
    }
});

parentCards.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) {
        const modalId = card.dataset.modalId;
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.showModal();
        }
    }
});
mobileSearchInput.addEventListener('input', searchDaValue);

const search = document.getElementById('search');
search.addEventListener('input', searchDaValue);

whichClicked();
allBtnActive();
fetchingData();