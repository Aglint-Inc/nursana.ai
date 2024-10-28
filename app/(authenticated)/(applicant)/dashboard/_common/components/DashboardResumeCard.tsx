import React from 'react';

type ResumeCardProps = {
  status: 'reupload' | 'inProgress' | 'completed';
};

function ResumeCard({ status }: ResumeCardProps) {
  return (
    <>
      {status === 'reupload' && (
        <div>Unable to process resume upload again</div>
      )}
      {status === 'inProgress' && (
        <div>Scoring in progress</div>
      )}
      {status === 'completed' && (
        <div>Scoring Completed</div>
      )}
    </>
  );
}

export default ResumeCard;