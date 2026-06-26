'use client';

import { Manrope } from 'next/font/google';
import { 
  MessageSquare, Lightbulb, TrendingUp, Award, ArrowLeft, Send, Sparkles, BrainCircuit, Activity
} from 'lucide-react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';

const adminFont = Manrope({
  subsets: ['latin'],
  variable: '--admin-font',
  display: 'swap',
});

export default function MentorPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  return (
    <div className={`${adminFont.variable} ${styles.shell}`}>
      <div className={styles.content}>
        
        {/* Back navigation */}
        <header className={styles.header}>
          <a href={`/${locale}/parent`} className={styles.backLink}>
            <ArrowLeft size={14} /> Back to dashboard
          </a>
        </header>

        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.badge}>
            <Sparkles size={12} /> Next-Gen AI Coming Soon
          </div>
          <h1 className={styles.title}>AI Study Mentor</h1>
          <p className={styles.subtitle}>
            We are building an intelligent companion to guide your child's syllabus progress and answer all your learning questions in real-time.
          </p>
        </section>

        {/* Mock Previews Layout */}
        <section className={styles.previewSection}>
          
          {/* Mock Chatbot Card */}
          <div className={styles.chatMockup}>
            <div className={styles.chatMockupHeader}>
              <div className={styles.chatMockupAvatar}>
                <BrainCircuit size={18} />
              </div>
              <div>
                <h4 className={styles.chatMockupName}>AI Mentor Bot</h4>
                <div className={styles.chatMockupMeta}>
                  <span className={styles.onlinePulse} />
                  <span>Model Training Active</span>
                </div>
              </div>
            </div>
            
            <div className={styles.chatMockupBody}>
              <div className={`${styles.bubble} ${styles.bubbleAi}`}>
                Hello! I am scanning Arun's quiz records. He completed English Phonics perfectly, but is currently stuck on Mathematics "Before & After Numbers".
              </div>
              <div className={`${styles.bubble} ${styles.bubbleParent}`}>
                How can I help him improve?
              </div>
              <div className={`${styles.bubble} ${styles.bubbleAi}`}>
                Try counting matching physical toys at home first. I have added a daily 5-minute size-matching recommendation to his study queue.
              </div>
            </div>
            
            <div className={styles.chatMockupFooter}>
              <div className={styles.inputField}>Type a study recommendation question...</div>
              <button className={styles.sendBtn} disabled aria-label="Send message">
                <Send size={14} />
              </button>
            </div>
          </div>

          {/* Mock Predictive Chart Card */}
          <div className={styles.chartMockup}>
            <div className={styles.chartMockupHeader}>
              <h4 className={styles.chartMockupTitle}>Predictive Performance Forecast</h4>
              <p className={styles.chartMockupSubtitle}>
                Estimated completion speeds based on active daily streaks
              </p>
            </div>
            
            <div className={styles.visualGraphArea}>
              <div>
                <div className={styles.bar} style={{ height: '7rem' }} />
                <p className={styles.graphLabel}>English</p>
              </div>
              <div>
                <div className={styles.bar} style={{ height: '5.2rem' }} />
                <p className={styles.graphLabel}>Tamil</p>
              </div>
              <div>
                <div className={`${styles.bar} ${styles.barForecast}`} style={{ height: '3.5rem' }} />
                <p className={styles.graphLabel}>Math</p>
              </div>
              <div>
                <div className={`${styles.bar} ${styles.barForecast}`} style={{ height: '2.5rem' }} />
                <p className={styles.graphLabel}>EVS</p>
              </div>
            </div>
            <div className={styles.graphXLabels}>
              <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#16a34a' }}>Completed</span>
              <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#14b8a6' }}>Forecasted (Oct)</span>
            </div>

            <div className={styles.predictionHighlightCard}>
              <Activity size={18} color="#0f766e" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
              <p className={styles.insightText}>
                <strong>AI Forecast:</strong> Arun is projected to complete the entire LKG syllabus by <strong>September 24th</strong> if he maintains his current daily learning pace.
              </p>
            </div>
          </div>
          
        </section>

        {/* Feature Grid Section */}
        <h3 className={styles.featureSectionTitle}>What to Expect</h3>
        <section className={styles.featureGrid}>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <MessageSquare size={18} />
            </div>
            <h4 className={styles.featureCardName}>Interactive AI Chatbot</h4>
            <p className={styles.featureCardDesc}>
              Ask questions about your child's homework, request custom tutoring examples, or get instant advice on tricky syllabus concepts.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <TrendingUp size={18} />
            </div>
            <h4 className={styles.featureCardName}>Predictive Forecasting</h4>
            <p className={styles.featureCardDesc}>
              Machine learning models analyze study intervals to project exact completion dates and outline optimal paces for your child.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Award size={18} />
            </div>
            <h4 className={styles.featureCardName}>Weak Area Spotting</h4>
            <p className={styles.featureCardDesc}>
              Automatically isolates spelling, numbering, or phonic mistakes across quiz history and details target areas needing review.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Lightbulb size={18} />
            </div>
            <h4 className={styles.featureCardName}>Smart Daily Action Plans</h4>
            <p className={styles.featureCardDesc}>
              Provides custom action triggers (recommendations and mini exercises) designed to patch gaps before moving to the next chapter.
            </p>
          </div>

        </section>

      </div>
    </div>
  );
}
