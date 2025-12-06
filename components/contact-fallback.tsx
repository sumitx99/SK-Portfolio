"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Phone, MessageCircle, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"

export function ContactFallback() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)

  const copyToClipboard = async (text: string, type: "email" | "phone") => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === "email") {
        setCopiedEmail(true)
        setTimeout(() => setCopiedEmail(false), 2000)
      } else {
        setCopiedPhone(true)
        setTimeout(() => setCopiedPhone(false), 2000)
      }
      toast.success(`${type === "email" ? "Email" : "Phone number"} copied to clipboard!`)
    } catch (err) {
      toast.error("Failed to copy to clipboard")
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-gradient-to-br from-red-500/10 to-red-700/10 border-red-500/20">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <MessageCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-red-500 mb-2">Having trouble with the form?</h3>
            <p className="text-muted-foreground">No worries! You can reach me directly using any of these methods:</p>
          </div>

          <div className="space-y-4">
            <motion.div
              className="flex items-center justify-between p-4 bg-black-900 rounded-lg border border-red-500/20"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">sumitranjan2207@gmail.com</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard("sumitranjan2207@gmail.com", "email")}
                className="border-red-500/20 hover:bg-red-500/10"
              >
                <AnimatePresence mode="wait">
                  {copiedEmail ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center gap-1"
                    >
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-green-500">Copied!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center gap-1"
                    >
                      <Copy className="h-4 w-4" />
                      <span>Copy</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center justify-between p-4 bg-black-900 rounded-lg border border-red-500/20"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">+91 8955411699</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard("+91 8955411699", "phone")}
                className="border-red-500/20 hover:bg-red-500/10"
              >
                <AnimatePresence mode="wait">
                  {copiedPhone ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center gap-1"
                    >
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-green-500">Copied!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center gap-1"
                    >
                      <Copy className="h-4 w-4" />
                      <span>Copy</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                className="flex-1 border-red-500/20 hover:bg-red-500/10"
                onClick={() => window.open("mailto:sumitranjan2207@gmail.com", "_blank")}
              >
                <Mail className="h-4 w-4 mr-2" />
                Open Email App
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-red-500/20 hover:bg-red-500/10"
                onClick={() => window.open("tel:+918955411699", "_blank")}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
