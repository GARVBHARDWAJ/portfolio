"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TimelineSection() {
  const education = [
    {
      institution: "SRM Institute of Science & Technology",
      degree: "B.Tech Computer Science with AIML",
      period: "2023–2027",
      grade: "8.9 CGPA",
    },
    {
      institution: "Shiv Vani Sr. Sec. School",
      degree: "12th Standard",
      period: "2021–2023",
      grade: "75.2%",
    },
    {
      institution: "Shiv Vani Sr. Sec. School",
      degree: "10th Standard",
      period: "2020–2021",
      grade: "84.4%",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="space-y-4">
      {education.map((item, index) => (
        <motion.div key={index} variants={item}>
          <Card className="relative overflow-hidden card-hover interactive">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{item.institution}</CardTitle>
                  <CardDescription className="text-base mt-1">{item.degree}</CardDescription>
                </div>
                <Badge>{item.period}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                <span className="font-medium">Grade:</span> {item.grade}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
