// components/DotPatternBackground.jsx
"use client"

const DotPatternBackground = () => {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute inset-0 dot-pattern opacity-20 dark:opacity-30"></div>
      </div>
      
      {/* Embedded styles for the dot pattern */}
      <style jsx global>{`
        .dot-pattern {
          background-size: 24px 24px;
          background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
        }
      `}</style>
    </>
  )
}

export default DotPatternBackground