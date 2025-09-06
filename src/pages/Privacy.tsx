import { motion } from 'framer-motion'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="aurora-text">Privacy</span>{' '}
              <span className="text-foreground">Policy</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-foreground leading-relaxed mb-6">
              We collect information you provide directly to us, such as when you create an account, publish content, or contact us for support. This may include your name, email address, username, and any content you submit to our platform. We also automatically collect certain information about your device and usage of our services, including IP address, browser type, operating system, and pages visited.
            </p>

            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-foreground leading-relaxed mb-6">
              We use the information we collect to provide, maintain, and improve our services, including personalizing your experience, processing transactions, and communicating with you. We may also use your information to send you updates, newsletters, and promotional materials if you've opted in to receive them. Additionally, we analyze usage patterns to understand how our platform is used and to make improvements.
            </p>

            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing and Disclosure</h2>
            <p className="text-foreground leading-relaxed mb-6">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with trusted service providers who assist us in operating our platform, conducting our business, or serving our users, provided they agree to keep this information confidential. We may also disclose your information if required by law or to protect our rights and safety.
            </p>

            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-foreground leading-relaxed mb-6">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption of data in transit and at rest, regular security audits, and access controls. However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="text-foreground leading-relaxed mb-6">
              We use cookies and similar tracking technologies to enhance your experience on our platform. Cookies help us remember your preferences, analyze site traffic, and personalize content. You can control cookie settings through your browser, though disabling cookies may affect the functionality of our services. We may also use analytics tools to understand how users interact with our platform.
            </p>

            <h2 className="text-2xl font-semibold mb-4">6. Third-Party Services</h2>
            <p className="text-foreground leading-relaxed mb-6">
              Our platform may contain links to third-party websites or integrate with third-party services. We are not responsible for the privacy practices of these external sites or services. We encourage you to review the privacy policies of any third-party services you use in connection with our platform.
            </p>

            <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
            <p className="text-foreground leading-relaxed mb-6">
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>

            <h2 className="text-2xl font-semibold mb-4">8. Your Rights and Choices</h2>
            <p className="text-foreground leading-relaxed mb-6">
              You have the right to access, update, or delete your personal information. You can also opt out of receiving promotional communications from us. To exercise these rights or if you have questions about our privacy practices, please contact us through our contact page. We will respond to your requests in accordance with applicable law.
            </p>

            <h2 className="text-2xl font-semibold mb-4">9. Data Retention</h2>
            <p className="text-foreground leading-relaxed mb-6">
              We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When we no longer need your information, we will securely delete or anonymize it.
            </p>

            <h2 className="text-2xl font-semibold mb-4">10. International Data Transfers</h2>
            <p className="text-foreground leading-relaxed mb-6">
              Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
            </p>

            <h2 className="text-2xl font-semibold mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-foreground leading-relaxed mb-6">
              We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date. Your continued use of our services after such changes constitutes your acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
            <p className="text-foreground leading-relaxed">
              If you have any questions about this privacy policy or our privacy practices, please contact us through our contact page or by emailing us directly. We are committed to addressing your concerns and will respond to your inquiries as quickly as possible.
            </p>

            <p className="text-foreground leading-relaxed mt-8">
              Last Updated: December 2024
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
