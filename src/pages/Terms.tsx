import { motion } from 'framer-motion'

export default function Terms() {
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
              <span className="aurora-text">Terms</span>{' '}
              <span className="text-foreground">& Conditions</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using our platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-foreground leading-relaxed mb-6">
              Welcome to Maati World. These terms and conditions govern your use of our website, services, and community platform. By accessing, browsing, or using our site, you acknowledge that you have read, understood, and agree to be bound by these terms and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>

            <h2 className="text-2xl font-semibold mb-4">2. User Conduct and Community Norms</h2>
            <p className="text-foreground leading-relaxed mb-6">
              As a user of Maati World, you agree to use the platform in a manner that is respectful, inclusive, and considerate of all individuals. Our community is built on principles of mutual respect and understanding. Discrimination, harassment, or any form of abusive behavior based on race, ethnicity, religion, gender, sexual orientation, gender identity, age, disability, or any other protected characteristic is strictly prohibited and will result in immediate account suspension or termination.
            </p>

            <h2 className="text-2xl font-semibold mb-4">3. LGBTQ+ Community Protections</h2>
            <p className="text-foreground leading-relaxed mb-6">
              Maati World is committed to creating and maintaining a safe, welcoming, and inclusive space for all members of the LGBTQ+ community and their allies. We recognize the importance of protecting the rights, dignity, and well-being of LGBTQ+ individuals. Any form of hate speech, discrimination, or targeted harassment against LGBTQ+ people, including but not limited to misgendering, deadnaming, or denial of identity, is strictly forbidden. We encourage the celebration of diverse identities and experiences while fostering an environment of acceptance and support.
            </p>

            <h2 className="text-2xl font-semibold mb-4">4. Content Guidelines</h2>
            <p className="text-foreground leading-relaxed mb-6">
              All content shared on Maati World, including but not limited to blog posts, comments, poems, and personal stories, must adhere to our community standards. Content should promote positive dialogue, respect differing viewpoints, and avoid harmful stereotypes or generalizations. We reserve the right to remove any content that violates these guidelines or that we deem inappropriate for our community. Users are encouraged to use inclusive language and to consider the impact of their words on others.
            </p>

            <h2 className="text-2xl font-semibold mb-4">5. Privacy and Data Protection</h2>
            <p className="text-foreground leading-relaxed mb-6">
              We are committed to protecting your privacy and personal information. Our privacy policy outlines how we collect, use, and safeguard your data. By using our platform, you consent to the collection and use of information in accordance with our privacy policy. We do not share personal information with third parties without your explicit consent, except as required by law.
            </p>

            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
            <p className="text-foreground leading-relaxed mb-6">
              All content on Maati World, including text, images, and other materials, is protected by copyright and other intellectual property laws. Users retain ownership of their original content but grant Maati World a license to use, display, and distribute their content on our platform. You may not reproduce, distribute, or create derivative works from our content without prior written permission.
            </p>

            <h2 className="text-2xl font-semibold mb-4">7. Account Termination</h2>
            <p className="text-foreground leading-relaxed mb-6">
              Maati World reserves the right to suspend or terminate your account at any time for violations of these terms, community guidelines, or for any other reason we deem necessary to maintain a safe and positive environment. Upon termination, your right to use the platform ceases immediately.
            </p>

            <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
            <p className="text-foreground leading-relaxed mb-6">
              Maati World and its affiliates shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the platform. We do not guarantee the accuracy, completeness, or reliability of any content on our site.
            </p>

            <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
            <p className="text-foreground leading-relaxed mb-6">
              These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Maati World operates, without regard to its conflict of law provisions.
            </p>

            <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
            <p className="text-foreground leading-relaxed">
              Maati World reserves the right to modify these terms at any time. Changes will be effective immediately upon posting on the website. Your continued use of the platform after changes are posted constitutes your acceptance of the modified terms.
            </p>

            <p className="text-foreground leading-relaxed mt-8">
              If you have any questions about these terms and conditions, please contact us through our contact page. Thank you for being part of the Maati World community and for helping us maintain a respectful and inclusive space for all.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
