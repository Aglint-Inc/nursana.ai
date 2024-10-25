import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Award,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Hospital,
  MapPin,
} from 'lucide-react';
import { leaderboardData } from '../../contant';
import { useState } from 'react';

// Applicant Leaderboard Component
function ApplicantLeaderboard() {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='text-md font-semi-bold'>Top Applicants</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {leaderboardData.map((applicant, index) => (
          <div key={applicant.id} className='border-b pb-4 last:border-b-0'>
            <button
              className='flex w-full cursor-pointer items-center justify-between text-left'
              onClick={() => toggleRow(applicant.id)}
            >
              <div className='flex items-center space-x-2'>
                <Badge variant='outline'>{index + 1}</Badge>
                <span className='font-medium'>{applicant.name}</span>
              </div>
              <Badge>{applicant.overallFit}% fit</Badge>
              {expandedRows.includes(applicant.id) ? (
                <ChevronDown size={20} />
              ) : (
                <ChevronRight size={20} />
              )}
            </button>
            {expandedRows.includes(applicant.id) && (
              <div className='mt-2 space-y-2 text-sm'>
                <div className='flex items-center space-x-2'>
                  <Award size={16} />
                  <span>{applicant.licenseMatch.details}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <MapPin size={16} />
                  <span>{applicant.locationMatch.details}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Hospital size={16} />
                  <span>{applicant.hospitalMatch.details}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <GraduationCap size={16} />
                  <span>{applicant.schoolMatch.details}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default ApplicantLeaderboard;
