import { useEffect, type ReactNode } from 'react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ArrowRight, ArrowUpRight, Download, ExternalLink, Mail } from 'lucide-react';

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const cvUrl = assetUrl('documents/erika-oh-cv.pdf');
const featuredPaperUrl = assetUrl('documents/featured-study.pdf');
const profileImageUrl = assetUrl('images/erika-oh-profile.png');
const frameworkFigureUrl = assetUrl('images/hair-framework.png');
const scholarUrl = 'https://scholar.google.com/citations?user=kZAz0c8AAAAJ&hl=en&oi=ao';
const doiFeatured = 'https://doi.org/10.1080/10447318.2026.2648799';

function SafeExternal({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className} data-testid="link-external">{children}<span className="sr-only"> (opens in a new tab)</span></a>;
}

function Header() {
  const [location] = useLocation();
  const items = [['About', '/'], ['Research', '/research'], ['CV', '/cv'], ['Contact', '/contact']];
  return <header className="site-header">
    <div className="header-inner">
      <div className="topline">
        <Link href="/" className="wordmark" aria-label="Yoo Jung (Erika) Oh — About" data-testid="link-wordmark">
          <span className="wordmark-name">Yoo Jung (Erika) Oh</span>
          <span className="wordmark-sub">Communication · Michigan State University</span>
        </Link>
        <nav className="nav" aria-label="Main navigation">
          {items.map(([label, path]) => <Link key={path} href={path} aria-current={location === path ? 'page' : undefined} data-testid={`nav-${label.toLowerCase()}`}>{label}</Link>)}
        </nav>
      </div>
      <div className="header-rule" />
    </div>
  </header>;
}

function Footer() {
  return <footer className="site-footer">
    <div className="footer-inner">
      <p>Yoo Jung (Erika) Oh · Department of Communication<br />Michigan State University</p>
      <p>This personal academic website is not an official Michigan State University website.</p>
    </div>
  </footer>;
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="site-shell"><a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:p-3">Skip to content</a><Header /><main id="main-content" className="page-main">{children}</main><Footer /></div>;
}

function PageMeta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    const pageTitle = `${title} | Yoo Jung (Erika) Oh`;
    document.title = pageTitle;
    const setMeta = (selector: string, attribute: string, key: string, content: string) => {
      let meta = document.querySelector<HTMLMetaElement>(selector);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, key);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', pageTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
  }, [title, description]);
  return null;
}

function Home() {
  return <Shell>
    <PageMeta title="About" description="Yoo Jung (Erika) Oh is an Assistant Professor of Communication at Michigan State University. Learn about her research in human–AI communication and health communication." />
    <section className="home-hero" aria-labelledby="home-title">
      <div className="hero-text">
        <p className="page-kicker">Communication · Human–AI interaction</p>
        <h1 className="hero-title" id="home-title"><span>Yoo Jung</span><span className="italic">(Erika) Oh</span></h1>
        <p className="hero-position">Assistant Professor<br />Department of Communication<br />Michigan State University</p>
        <p className="hero-summary">I study how people communicate with, relate to, and are influenced by artificial intelligence—with a focus on chatbots, health communication, and technology-supported health behavior.</p>
        <div className="hero-actions">
          <Link href="/research" className="button-primary" data-testid="button-explore-research">Explore my research <ArrowRight size={15} aria-hidden="true" /></Link>
          <a href={cvUrl} download className="button-outline" data-testid="button-download-cv"><Download size={15} aria-hidden="true" /> Download CV</a>
        </div>
      </div>
      <div className="portrait-wrap">
        <img className="portrait" src={profileImageUrl} alt="Professional portrait of Yoo Jung (Erika) Oh" data-testid="img-profile" />
        <p className="portrait-caption">Scholarship at the intersection of communication and technology</p>
      </div>
    </section>
    <section className="home-lower" aria-label="Biography and research interests">
      <div className="bio-block">
        <p className="eyebrow">About</p>
        <h2 className="section-heading">People first. Technology in context.</h2>
        <p>Yoo Jung (Erika) Oh is an Assistant Professor in the Department of Communication at Michigan State University. Her research spans human-AI communication and human-computer interaction, with particular attention to AI chatbots, strategic communication, health communication, public health, and health technologies. Her work examines chatbot and voice-assistant interactions, health messaging, and technology-supported health behavior.</p>
        <div className="education-note"><strong>Education</strong><br />PhD in Communication, with a Designated Emphasis in Computational Social Science<br />University of California, Davis, 2023</div>
      </div>
      <div>
        <p className="eyebrow">Research interests</p>
        <h2 className="section-heading">Questions across people, messages, and machines.</h2>
        <ul className="interest-list">
          {['Human–AI communication', 'Human–computer interaction', 'AI chatbots', 'Relational AI', 'Health communication', 'Interpersonal influence', 'Persuasion', 'Public health', 'Health technologies'].map((item) => <li key={item}>{item}</li>)}
        </ul>
        <div className="research-teaser">
          <p>How do relationships with chatbots shape social influence?</p>
          <Link href="/research" className="text-link" data-testid="link-featured-research">Read about the research <ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
        <p style={{ marginTop: 20, fontSize: 13 }}><a className="text-link" href="mailto:ohyoojun@msu.edu"><Mail size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />ohyoojun@msu.edu</a> · <SafeExternal href={scholarUrl} className="text-link">Google Scholar</SafeExternal></p>
      </div>
    </section>
  </Shell>;
}

type Publication = { citation: string; doi?: string };
function Pub({ citation, doi }: Publication) {
  return <article className="publication"><p>{citation}</p>{doi && <SafeExternal href={doi} className="text-link">View publication <ArrowUpRight size={12} aria-hidden="true" /></SafeExternal>}</article>;
}

function Research() {
  return <Shell>
    <PageMeta title="Research" description="Research by Yoo Jung (Erika) Oh on human–AI communication, relational chatbots, persuasion, health communication, and social influence!" />
    <section className="research-intro">
      <p className="page-kicker">Research</p>
      <h1 className="page-heading">People, relationships<br />& intelligent systems.</h1>
      <p className="intro-copy">My research examines how people communicate with, relate to, and are influenced by artificial intelligence. Across relational AI, conversational agents, health communication, and persuasion, I ask how design and messages shape human experience—and what responsible, useful technologies might look like.</p>
    </section>
    <section className="featured" aria-labelledby="featured-title">
      <p className="eyebrow">Featured systematic review</p>
      <h2 id="featured-title" className="featured-title">Artificial Intelligence Chatbots as Relational Agents: A Systematic Review of Human–AI Chatbot Relationships</h2>
      <p className="featured-byline">Oh, Y. J., Hu, J., Zhu, Rui, Lim, J. I., &amp; Zhang, X. (2026). <em>International Journal of Human–Computer Interaction</em>, 1–25.</p>
      <p className="feature-overview">This review asks how relationships between people and AI chatbots shape social influence. Rather than testing one chatbot or reporting a single experiment, it brings together a growing body of published studies to map the relational pathways through which people may be influenced.</p>
      <div className="feature-grid">
        <div className="feature-fact"><h3>Central questions</h3><p>Which user, chatbot, and message characteristics shape human–AI chatbot relationships, and what social-influence outcomes follow from those relationships?</p></div>
        <div className="feature-fact"><h3>Method & scope</h3><p>A PRISMA-guided qualitative systematic review searched ACM Digital Library, Web of Science, Scopus, IEEE, EBSCO, and PsycINFO. It identified 16,358 records; after duplicates were removed, 7,727 abstracts were screened. The review included 68 papers containing 78 studies and collected no new human-participant data. These counts describe the literature, not a participant sample.</p></div>
        <div className="feature-fact"><h3>What the review finds</h3><p>Trust and perceived social support often act as relational mediators of social influence. Trust is the most prominent mediator and is linked to persuasion or compliance and continued-use intentions. Empathic and responsive message factors are associated with relational outcomes, but remain underexplored.</p></div>
        <div className="feature-fact"><h3>Why it matters</h3><p>Influence from a chatbot is not only a matter of message content. Relational perceptions can shape how people respond, with implications for designing and evaluating conversational agents in everyday and health contexts.</p></div>
        <div className="feature-fact"><h3>Theoretical & practical implications</h3><p>The HAIR framework positions relationships as pathways linking user, chatbot, and message characteristics to social influence. In practice, chatbot design can attend to trust, support, empathy, and responsiveness while guarding against overreliance. The evidence base remains limited by short-term designs, inconsistent construct definitions, and weak sample representativeness.</p></div>
        <div className="feature-fact"><h3>Takeaway</h3><p>To understand what a chatbot message does, it helps to understand the relationship through which that message is received.</p></div>
      </div>
      <figure className="figure-frame" id="featured-framework">
        <div className="figure-scroll" role="region" aria-label="Scrollable research framework figure" tabIndex={0}>
          <img src={frameworkFigureUrl} alt="Original Figure 1 framework diagram. User, message, and chatbot characteristics connect to relational perceptions and behaviors, then to socially influenced perceptions and behaviors." />
        </div>
        <figcaption>
          <p className="figure-caption">Figure 1. Human–AI relationship framework of social influence.</p>
          <p className="figure-description">In plain language, user, chatbot, and message characteristics can shape relational perceptions and behaviors, which connect to socially influenced perceptions and behaviors.</p>
          <p className="figure-scroll-note">On a narrow screen, scroll the figure horizontally or <a href={frameworkFigureUrl} target="_blank" rel="noopener noreferrer">open it full size</a> to inspect the details.</p>
        </figcaption>
      </figure>
      <p style={{ marginTop: 22 }}><a href={featuredPaperUrl} target="_blank" rel="noopener noreferrer" className="button-primary">Read the publication <ExternalLink size={14} aria-hidden="true" /></a></p>
    </section>
    <section className="content-section" aria-labelledby="publications-title">
      <p className="eyebrow">Selected publications</p>
      <h2 id="publications-title" className="section-heading">Research across connected themes</h2>
      <div className="pub-groups">
        <div className="pub-theme"><span>01 · Research theme</span>Relational AI & conversational agents</div>
        <div>
          <Pub citation="Oh, Y. J.,* Hu, J., Zhu, Rui, Lim, J. I., & Zhang, X. (2026). Artificial intelligence chatbots as relational agents: A systematic review of human-AI chatbot relationships. International Journal of Human-Computer Interaction. 1-25." doi={doiFeatured} />
          <Pub citation="Oh, Y. J.,* Liang, K.-H., Kim, D. D., Zhang, X., Yu, Z., Fukuoka, Y., & Zhang, J. (2025). Enhancing physical activity through a relational artificial intelligence chatbot: A feasibility and usability study. Digital Health, 11." doi="https://doi.org/10.1177/20552076251324445" />
          <Pub citation="Oh, Y. J.,* Ryu, J. Y., Han, J., Park, S., Lim, J. I., Youk, S., & Park, H. S. (2025). Trust in AI doctors: How credibility and message richness in AI-based providers influence patient adherence. Advances in Human‐Computer Interaction, 2025(1), 5934127." doi="https://doi.org/10.1155/ahci/5934127" />
          <Pub citation="Xue, H., Oh, Y. J., Zhou, X., Zhang, X., & Oxley, B. (2026). Users’ prompting strategies and ChatGPT’s contextual adaptation shape conversational information-seeking experiences. Scientific Reports, 16(1), 12112." doi="https://doi.org/10.1038/s41598-026-42465-4" />
          <Pub citation="Liang, K. H., Shi, W., Oh, Y. J., Wang, H. C., Zhang, J., & Yu, Z. (2024). Dialoging resonance in human-chatbot conversation: How users perceive and reciprocate recommendation chatbot's self-disclosure strategy. Proceedings of the ACM on Human-Computer Interaction, 8(CSCW1), 1-28." doi="https://doi.org/10.1145/3653691" />
          <Pub citation="Shi, W., Wang, X., Oh, Y. J., Zhang, J., Sahay, S., & Yu, Z. (2020). Effects of persuasive dialogues: Testing bot identities and inquiry strategies. In Proceedings of the 2020 CHI Conference on Human Factors in Computing Systems (pp. 1-13)." doi="https://dl.acm.org/doi/10.1145/3313831.3376843" />
        </div>
      </div>
      <div className="pub-groups">
        <div className="pub-theme"><span>02 · Research theme</span>Health communication & behavior</div>
        <div>
          <Pub citation="Oh, Y. J.,* Park, S., & Ryu, J. Y. (2026). Boosting organ donation self-efficacy through AI-generated health messaging: the differential impacts of “why” vs. “how” messaging and media modality. Health Communication, 41(9), 1580-1589." doi="https://doi.org/10.1080/10410236.2025.2580327" />
          <Pub citation="Choung, H., Oh, Y. J., Wolfe, B. H., Cui, X., Weinzapfel, J., & Cooper, R.A. (2026). Exploring older adults’ use of AI voice assistants through the lens of self-determination theory. Health Communication, 1-15." doi="https://doi.org/10.1080/10410236.2026.2694693" />
          <Pub citation="Wolfe, B. H., Oh, Y. J., Choung, H., Cui, X., Weinzapfel, J., Cooper, R. A., Lee, H., & Lehto, R. (2025). Caregiving artificial intelligence chatbot for older adults: A mixed-methods study on their preferences, well-being, and social connectivity. Journal of Internet Medical Research, 27, e65776." doi="https://doi.org/10.2196/65776" />
          <Pub citation="Oh, Y. J.,* Zhang, J., Fang, M. L., & Fukuoka, Y. (2021). A systematic review of artificial intelligence chatbots for promoting physical activity, healthy diet, and weight loss. International Journal of Behavioral Nutrition and Physical Activity, 18(1), 1-25." doi="https://doi.org/10.1186/s12966-021-01224-6" />
        </div>
      </div>
      <div className="pub-groups">
        <div className="pub-theme"><span>03 · Research theme</span>Interpersonal influence & persuasion</div>
        <div>
          <Pub citation="Liao, W.*, Oh, Y. J.*, Zhang, J., & Feng, B. (2023). Conversational dynamics of joint attention and shared emotion predict outcomes in interpersonal influence situations: an interaction ritual perspective. Journal of Communication, 73(4), 342-355." doi="https://doi.org/10.1093/joc/jqad003" />
          <Pub citation="Liao, W., Oh, Y. J., Feng, B., & Zhang, J. (2023). Understanding the influence discrepancy between human and artificial agent in advice interactions: The role of stereotypical perception of agency. Communication Research, 50(5), 633-664." doi="https://doi.org/10.1177/00936502221138427" />
          <Pub citation="Liao, W., Zhang, J., Oh, Y. J., & Palomares, N. A. (2021). Linguistic accommodation enhances compliance to charity donation: The role of interpersonal communication processes in mediated compliance-gaining conversations. Journal of Computer-Mediated Communication, 36(3), 167-185." doi="https://doi.org/10.1093/jcmc/zmab001" />
        </div>
      </div>
    </section>
  </Shell>;
}

function CV() {
  return <Shell>
    <PageMeta title="Curriculum Vitae" description="Curriculum vitae of Yoo Jung (Erika) Oh, Assistant Professor in the Department of Communication at Michigan State University." />
    <section className="cv-intro">
      <p className="page-kicker">Curriculum vitae</p>
      <h1 className="page-heading">Academic profile<br />& experience.</h1>
      <p className="intro-copy">View the full curriculum vitae below, or download the PDF for a copy to keep.</p>
      <div className="cv-actions">
        <a href={cvUrl} download className="button-primary" data-testid="button-download-cv-page"><Download size={15} aria-hidden="true" /> Download CV</a>
        <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="button-outline" data-testid="link-open-cv"><ExternalLink size={15} aria-hidden="true" /> Open PDF in a new tab</a>
      </div>
    </section>
    <section aria-label="Embedded curriculum vitae PDF">
      <iframe className="cv-viewer" src={`${cvUrl}#view=FitH`} title="Yoo Jung (Erika) Oh curriculum vitae PDF" />
      <p className="cv-fallback">If the PDF does not display in your browser, use <a className="text-link" href={cvUrl} target="_blank" rel="noopener noreferrer">the new-tab PDF link</a> or download the file above.</p>
    </section>
  </Shell>;
}

function Contact() {
  return <Shell>
    <PageMeta title="Contact" description="Contact Yoo Jung (Erika) Oh at the Department of Communication, Michigan State University." />
    <section className="contact-section">
      <p className="page-kicker">Contact</p>
      <h1 className="page-heading">Let’s connect.</h1>
      <p className="intro-copy">For academic inquiries and conversations about research, please get in touch by email or visit my Google Scholar profile.</p>
      <div className="contact-card">
        <div className="contact-detail"><h2>Email</h2><a href="mailto:ohyoojun@msu.edu" data-testid="link-email">ohyoojun@msu.edu</a></div>
        <div className="contact-detail"><h2>Google Scholar</h2><SafeExternal href={scholarUrl}>View publications and citations <ArrowUpRight size={14} aria-hidden="true" /></SafeExternal></div>
        <div className="contact-detail"><h2>Department</h2><p>Department of Communication</p></div>
        <div className="contact-detail"><h2>Institution</h2><p>Michigan State University</p></div>
      </div>
      <p className="contact-note">Email is the best way to reach me. I have listed only the professional profile supplied in my materials; no additional social or researcher profiles are included.</p>
      <p style={{ marginTop: 28 }}><a href="mailto:ohyoojun@msu.edu" className="button-primary"><Mail size={15} aria-hidden="true" /> Send an email</a></p>
    </section>
  </Shell>;
}

function NotFound() {
  return <Shell><section className="not-found"><p className="page-kicker">Page not found</p><h1 className="page-heading">This page isn’t here.</h1><p className="intro-copy">Try returning to the About page.</p><Link href="/" className="button-primary">Back to About <ArrowRight size={15} aria-hidden="true" /></Link></section></Shell>;
}

function Router() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/research" component={Research} />
    <Route path="/cv" component={CV} />
    <Route path="/contact" component={Contact} />
    <Route component={NotFound} />
  </Switch>;
}

function App() {
  return <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter>;
}

export default App;
