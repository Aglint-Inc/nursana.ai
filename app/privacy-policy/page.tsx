import Footer from '@/components/footer';
import NursanaLogo from '@/components/nursana-logo';

export default function PrivacyPolicy() {
  return (
    <div className='flex w-full flex-col gap-8 overflow-auto pt-10'>
      <div className='max-md:px-5 md:mx-auto'>
        <NursanaLogo />
      </div>
      <div className='flex min-h-screen flex-col px-4 pt-8 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-3xl overflow-hidden'>
          <div className='px-4 py-5 max-md:px-0'>
            <h1 className='mb-6 text-3xl font-medium text-gray-900'>
              Privacy Policy
            </h1>

            <p className='mb-4 text-gray-600'>
              Your privacy is important to us. It is Aglint Inc.&apos;s policy
              to respect your privacy and comply with any applicable law and
              regulation regarding any personal information we may collect about
              you, including across our website,{' '}
              <a
                href='https://nursana.ai'
                className='text-blue-600 hover:underline'
                target='_blank'
              >
                https://nursana.ai
              </a>
              , and other sites we own and operate.
            </p>

            <h2 className='mb-4 mt-8 text-xl font-medium text-gray-900'>
              Information We Collect
            </h2>
            <p className='mb-4 text-gray-600'>
              We collect information in the following ways:
            </p>
            <ul className='mb-6 list-inside list-disc space-y-2 text-gray-600'>
              <li>
                <strong className='font-medium'>Voluntarily provided</strong>:
                Any information you knowingly and actively provide us when using
                or participating in any of our services and promotions.
              </li>
              <li>
                <strong className='font-medium'>Automatically collected</strong>
                : Information automatically sent by your devices in the course
                of accessing our products and services, such as log data (e.g.,
                IP address, browser type, pages visited).
              </li>
            </ul>

            <h2 className='mb-4 mt-8 text-xl font-medium text-gray-900'>
              Personal Information
            </h2>
            <p className='mb-6 text-gray-600'>
              We may ask for personal information such as your name and email
              when you register an account or contact us.
            </p>

            <h2 className='mb-4 mt-8 text-xl font-medium text-gray-900'>
              User-Generated Content
            </h2>
            <p className='mb-6 text-gray-600'>
              Any content voluntarily supplied to us by our users for the
              purpose of publication or usage on our platform is considered
              user-generated content. Please be aware that any content you
              submit for publication will be public after posting.
            </p>

            <h2 className='mb-4 mt-8 text-xl font-medium text-gray-900'>
              Collection and Use of Information
            </h2>
            <p className='mb-4 text-gray-600'>
              We collect personal information from you for purposes such as:
            </p>
            <ul className='mb-6 list-inside list-disc space-y-2 text-gray-600'>
              <li>Providing core features and services.</li>
              <li>Customizing your experience on our website.</li>
              <li>Contacting and communicating with you.</li>
            </ul>

            <h2 className='mb-4 mt-8 text-xl font-medium text-gray-900'>
              Security of Your Personal Information
            </h2>
            <p className='mb-6 text-gray-600'>
              We use commercially acceptable means to protect your personal
              information. However, no method of electronic transmission or
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className='mb-4 mt-8 text-xl font-medium text-gray-900'>
              How Long We Keep Your Personal Information
            </h2>
            <p className='mb-6 text-gray-600'>
              We keep your personal information only for as long as we need to.
              If it is no longer required, we will delete it or make it
              anonymous.
            </p>

            <h2 className='mb-4 mt-8 text-xl font-medium text-gray-900'>
              Children&apos;s Privacy
            </h2>
            <p className='mb-6 text-gray-600'>
              We do not knowingly collect personal information from children
              under 13 years of age.
            </p>

            <h2 className='mb-4 mt-8 text-xl font-medium text-gray-900'>
              Disclosure of Personal Information to Third Parties
            </h2>
            <p className='mb-6 text-gray-600'>
              We may disclose personal information to third-party service
              providers, employees, contractors, or regulatory authorities as
              required by law or in connection with any legal proceedings.
            </p>

            <h2 className='mb-4 mt-8 text-xl font-medium text-gray-900'>
              Your Rights and Controlling Your Personal Information
            </h2>
            <p className='mb-6 text-gray-600'>
              You have the right to access, correct, or delete the personal
              information we hold about you. If you wish to make a complaint,
              please contact us, and we will promptly investigate and respond.
            </p>

            <h2 className='mb-4 mt-8 text-xl font-medium text-gray-900'>
              Use of Cookies
            </h2>
            <p className='mb-6 text-gray-600'>
              We use cookies to collect information about you and your activity
              across our site to understand your preferences and enhance your
              experience.
            </p>

            <h2 className='mb-4 mt-8 text-xl font-medium text-gray-900'>
              Changes to This Policy
            </h2>
            <p className='mb-6 text-gray-600'>
              We may change our privacy policy from time to time to reflect
              updates to our business processes, current acceptable practices,
              or legislative or regulatory changes. Any changes will be posted
              here.
            </p>

            <h2 className='mb-4 mt-8 text-xl font-medium text-gray-900'>
              Contact Us
            </h2>
            <p className='mb-6 text-gray-600'>
              For any questions or concerns regarding your privacy, you may
              contact us at:
            </p>
            <p className='mb-6 text-gray-600'>
              <strong>Aglint Inc.</strong>
              <br />
              3020 Bernal Ave, 110-334, Pleasanton, CA 94566
              <br />
              Email: support@aglinthq.com
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
