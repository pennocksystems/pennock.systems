const demoData = {
  brewery: {
    title: "Private Party Inquiry",
    prompt: "A customer asked if our brewery can host a 45-person birthday party next month with a reserved area, drink tickets, and a food truck. How should we handle this?",
    summary: "The assistant should qualify the request, check event availability, capture package preferences, and send the customer a clear next step before staff manually reviews the lead.",
    plan: [
      ["Qualify the event", "Capture date, guest count, event type, reserved space needs, drink package, and catering preferences."],
      ["Check availability", "Compare requested times against the taproom calendar and suggest open event windows."],
      ["Send follow-up", "Email the event package, deposit instructions, and a handoff note for the events manager."]
    ],
    actions: [
      ["Lead qualified", "Guest count, date, drink tickets, food truck interest, and package needs captured."],
      ["Calendar checked", "Available private event windows identified before staff involvement."],
      ["CRM updated", "Contact, event type, preferred date, and estimated value saved."],
      ["Follow-up sent", "Package details, next steps, and deposit instructions delivered automatically."]
    ]
  },
  events: {
    title: "Corporate Happy Hour",
    prompt: "A nearby company wants to rent part of our taproom for a 30-person happy hour and asks about drink tickets. What should we do?",
    summary: "The assistant should identify this as a corporate private event lead, collect quote inputs, and route the opportunity to the events manager with enough context to respond quickly.",
    plan: [
      ["Classify the inquiry", "Detect corporate event intent and route it to the private events workflow."],
      ["Collect quote inputs", "Ask for guest count, bar preference, timing, food needs, and billing contact."],
      ["Create staff task", "Send a review task to the events manager and start a quote follow-up sequence."]
    ],
    actions: [
      ["Event type detected", "Corporate happy hour routed to the private events workflow."],
      ["Quote inputs captured", "Guest count, bar preference, and space fit stored."],
      ["Team task created", "Events manager receives a same-day review task."],
      ["Sales follow-up queued", "Package email and reminder sequence started."]
    ]
  },
  membership: {
    title: "Beer Club Signup",
    prompt: "A regular taproom customer asks about our mug club or beer membership. How can we turn that conversation into a membership signup?",
    summary: "The assistant should explain the membership value, recommend the right option, send the signup link, and add the customer to future release communications.",
    plan: [
      ["Explain benefits", "Summarize monthly pours, limited releases, event perks, and annual membership options."],
      ["Send signup link", "Route the customer to the correct membership page or checkout workflow."],
      ["Start retention", "Add the member to release notifications, pickup reminders, and event announcements."]
    ],
    actions: [
      ["Intent identified", "Membership inquiry classified as high-engagement customer interest."],
      ["Signup link sent", "Annual membership option delivered automatically."],
      ["List updated", "Customer added to release notification segment."],
      ["Retention workflow started", "Future release and event reminders queued."]
    ]
  },
  distribution: {
    title: "Wholesale Keg Lead",
    prompt: "A restaurant manager asks if our brewery distributes kegs and wants IPA and lager options. Do we have the means to explore this?",
    summary: "The assistant should qualify the wholesale lead, capture buyer details and style preferences, then route the request to the sales team with callback timing.",
    plan: [
      ["Capture buyer info", "Collect restaurant name, contact, location, style interest, and estimated volume."],
      ["Check availability", "Request current IPA and lager keg availability for the wholesale team."],
      ["Route sales follow-up", "Create a wholesale lead and propose callback windows for the sales manager."]
    ],
    actions: [
      ["Wholesale lead created", "Restaurant name, buyer intent, and preferred styles captured."],
      ["Sales route triggered", "Inquiry assigned to wholesale team instead of taproom staff."],
      ["Inventory context added", "IPA and lager availability requested for follow-up."],
      ["Callback proposed", "Next-step email sent with available sales call windows."]
    ]
  }
};

const typedPrompt = document.querySelector("#typedPrompt");
const answerPanel = document.querySelector("#geminiAnswer");
const eventList = document.querySelector("#event-list");
const demoTitle = document.querySelector("#demo-title");
const promptButtons = document.querySelectorAll(".prompt-chip");

let typingTimer;
let activeKey = "brewery";

function setActiveChip(key) {
  promptButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.demo === key);
  });
}

function renderLoading() {
  answerPanel.innerHTML = `
    <div class="gemini-loading">
  <div class="spark-mark">
    <link rel="logo-icon" src="../images/Logo.png" type="image/png" />
  </div>

  <p>Analyzing the prompt and preparing an automation plan...</p>

  <div class="loading-line"></div>
  <div class="loading-line short"></div>
</div>
  `;
}

function renderAnswer(key) {
  const demo = demoData[key];
  demoTitle.textContent = demo.title;

answerPanel.innerHTML = `
  <div class="gemini-result">
    <div class="gemini-result-head">
      <div class="spark-mark">
        <img src="Logo.png" alt="Logo" class="logo-icon">
      </div>
      <div>
        <strong>${demo.title}</strong>
        <span>Recommended brewery automation workflow</span>
      </div>
    </div>
    <p class="gemini-summary">${demo.summary}</p>
    <div class="gemini-plan">
      ${demo.plan.map(([title, text], index) => `
        <article>
          <span>0${index + 1}</span>
          <h3>${title}</h3>
          <p>${text}</p>
        </article>
      `).join("")}
    </div>
  </div>
`;

eventList.innerHTML = demo.actions.map(([title, text], index) => `
  <div class="event" style="animation-delay:${index * 110}ms">
    <strong>${title}</strong>
    <span>${text}</span>
  </div>
`).join("");
      }

function typePrompt(key) {
  const demo = demoData[key];
  let index = 0;

  activeKey = key;
  setActiveChip(key);
  window.clearInterval(typingTimer);
  typedPrompt.textContent = "";
  eventList.innerHTML = "";
  demoTitle.textContent = demo.title;
  renderLoading();

  typingTimer = window.setInterval(() => {
    typedPrompt.textContent = demo.prompt.slice(0, index);
    index += 1;

    if (index > demo.prompt.length) {
      window.clearInterval(typingTimer);
      window.setTimeout(() => renderAnswer(key), 450);
    }
  }, 24);
}

promptButtons.forEach((button) => {
  button.addEventListener("click", () => typePrompt(button.dataset.demo));
});

typePrompt(activeKey);
