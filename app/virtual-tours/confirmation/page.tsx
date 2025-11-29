'use client';

import Link from 'next/link';
import { CheckCircle, Home, Calendar } from 'lucide-react';

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Booking Confirmed!
        </h1>

        <p className="text-gray-600 mb-8">
          Your virtual tour has been successfully scheduled. We'll send you a confirmation email with the meeting link shortly.
        </p>

        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <div className="flex items-start gap-3 text-left">
            <div className="w-10 h-10 bg-[#037EBA]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-[#037EBA]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">What's Next?</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Check your email for meeting details</li>
                <li>• Add the event to your calendar</li>
                <li>• Join the tour at the scheduled time</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            href="/virtual-tours"
            className="block w-full bg-gradient-to-r from-[#037EBA] to-[#00B894] text-white py-4 rounded-lg font-bold hover:shadow-lg transition-all"
          >
            View My Tours
          </Link>

          <Link
            href="/feed"
            className="block w-full border-2 border-[#037EBA] text-[#037EBA] py-4 rounded-lg font-bold hover:bg-[#037EBA]/10 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
