import Footer from "@/components/footer";
import NursanaLogo from "@/components/nursana-logo";

export default function TermsAndConditions() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 pt-10">
      <NursanaLogo />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-3xl font-medium text-gray-900 mb-6">Terms of Service</h1>

            <p className="mb-4 text-gray-600">
              These Terms of Service govern your use of the website located at{' '}
              <a href="https://nurasana.ai" className="text-blue-600 hover:underline">
                https://nurasana.ai
              </a>{' '}
              and any related services provided by Aglint Inc.
            </p>

            <p className="mb-6 text-gray-600">
              <strong>Aglint Inc. Registered Address:</strong>
              <br />
              3020 Bernal Ave, Suite 110-334, Pleasanton, CA 94566
            </p>

            <p className="mb-6 text-gray-600">
              By accessing{' '}
              <a href="https://nurasana.ai" className="text-blue-600 hover:underline">
                https://nurasana.ai
              </a>
              , you agree to abide by these Terms of Service and to comply with all applicable laws and regulations. If
              you do not agree with these Terms of Service, you are prohibited from using or accessing this website or any
              services provided by Aglint Inc.
            </p>

            <p className="mb-6 text-gray-600">
              We, Aglint Inc., reserve the right to review and amend any of these Terms of Service at our sole discretion.
              Upon doing so, we will update this page. Any changes to these Terms of Service will take effect immediately
              from the date of publication.
            </p>

            <p className="mb-8 text-gray-600">
              These Terms of Service were last updated on 30 October 2024.
            </p>

            <h2 className="text-xl font-medium text-gray-900 mt-8 mb-4">Limitations of Use</h2>
            <p className="mb-4 text-gray-600">By using this website, you warrant on behalf of yourself, your users, and other parties you represent that you will not:</p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-600">
              <li>Modify, copy, prepare derivative works of, decompile, or reverse engineer any materials and software contained on this website.</li>
              <li>Remove any copyright or other proprietary notations from any materials and software on this website.</li>
              <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
              <li>Knowingly or negligently use this website or any of its associated services in a way that abuses or disrupts our networks or other services provided by Aglint Inc.</li>
              <li>Use this website or its associated services to transmit or publish any harassing, indecent, obscene, fraudulent, or unlawful material.</li>
              <li>Use this website or its associated services in violation of any applicable laws or regulations.</li>
              <li>Use this website in conjunction with sending unauthorized advertising or spam.</li>
              <li>Harvest, collect, or gather user data without the user&apos;s consent.</li>
              <li>Use this website or its associated services in such a way that may infringe the privacy, intellectual property rights, or other rights of third parties.</li>
            </ul>

            <h2 className="text-xl font-medium text-gray-900 mt-8 mb-4">Intellectual Property</h2>
            <p className="mb-6 text-gray-600">
              The intellectual property in the materials contained in this website is owned by or licensed to Aglint Inc. and is protected by applicable copyright and trademark law. We grant our users permission to download one copy of the materials for personal, non-commercial transitory use.
            </p>
            <p className="mb-6 text-gray-600">
              This constitutes the grant of a license, not a transfer of title. This license shall automatically terminate if you violate any of these restrictions or the Terms of Service and may be terminated by Aglint Inc. at any time.
            </p>

            <h2 className="text-xl font-medium text-gray-900 mt-8 mb-4">User-Generated Content</h2>
            <p className="mb-6 text-gray-600">
              You retain your intellectual property ownership rights over content you submit to us for publication on our website. We will never claim ownership of your content, but we do require a license from you in order to use it.
            </p>
            <p className="mb-6 text-gray-600">
              When you use our website or its associated services to post, upload, share, or otherwise transmit content covered by intellectual property rights, you grant us a non-exclusive, royalty-free, transferable, sub-licensable, worldwide license to use, distribute, modify, run, copy, publicly display, translate, or otherwise create derivative works of your content in a manner that is consistent with your privacy preferences and our Privacy Policy.
            </p>
            <p className="mb-6 text-gray-600">
              The license you grant us can be terminated at any time by deleting your content or account. However, to the extent that we (or our partners) have used your content in connection with commercial or sponsored content, the license will continue until the relevant commercial or post has been discontinued by us.
            </p>

            <h2 className="text-xl font-medium text-gray-900 mt-8 mb-4">Liability</h2>
            <p className="mb-6 text-gray-600">
              Our website and the materials on our website are provided on an &apos;as is&apos; basis. To the extent permitted by law, Aglint Inc. makes no warranties, expressed or implied, and hereby disclaims all other warranties, including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p className="mb-6 text-gray-600">
              In no event shall Aglint Inc. or its suppliers be liable for any consequential loss suffered or incurred by you or any third party arising from the use or inability to use this website or the materials on this website, even if Aglint Inc. or an authorized representative has been notified of the possibility of such damage.
            </p>

            <h2 className="text-xl font-medium text-gray-900 mt-8 mb-4">Governing Law</h2>
            <p className="mb-6 text-gray-600">
              These Terms of Service are governed by and construed in accordance with the laws of California, USA. You irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}