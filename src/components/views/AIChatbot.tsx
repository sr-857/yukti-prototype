"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bot,
    X,
    Send,
    Camera,
    Image as ImageIcon,
    MapPin,
    Recycle,
    AlertCircle,
    ChevronRight,
    Loader2,
    Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/core/lib/utils';

interface Message {
    id: string;
    role: 'user' | 'bot' | 'system';
    content: string;
    type: 'text' | 'image' | 'result';
    image?: string;
    result?: any;
    timestamp: Date;
}

export function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'bot',
            content: "Hi! I'm YUKTI-AI. Upload a photo of your waste, and I'll tell you if it's recyclable and find the nearest disposal point for you.",
            type: 'text',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendText = async () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            type: 'text',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simple AI Response logic for text
        setTimeout(() => {
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'bot',
                content: "I'm specialized in visual classification! Try uploading an image of the item you want to dispose of for the best results. 📸",
                type: 'text',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1000);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const base64Image = event.target?.result as string;

            const userMsg: Message = {
                id: Date.now().toString(),
                role: 'user',
                content: "Analyzing this item...",
                type: 'image',
                image: base64Image,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, userMsg]);
            setIsTyping(true);

            // Call Mock AI API
            try {
                const formData = new FormData();
                formData.append('image', file);
                // Using static coordinates for Guwahati
                formData.append('lat', "26.1445");
                formData.append('lng', "91.7362");

                const response = await fetch('/api/ai/classify', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                const botMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'bot',
                    content: `I've analyzed the image. It looks like **${result.material.display_name}**.`,
                    type: 'result',
                    result: result,
                    timestamp: new Date()
                };

                setMessages(prev => [...prev, botMsg]);
            } catch (error) {
                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    role: 'bot',
                    content: "Sorry, I had trouble analyzing that image. Please try again.",
                    type: 'text',
                    timestamp: new Date()
                }]);
            } finally {
                setIsTyping(false);
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-[90vw] md:w-[400px] h-[600px] bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-white/50 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-green-600 p-6 flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-xl">
                                    <Bot className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-black text-lg leading-tight">YUKTI AI</h3>
                                    <div className="flex items-center gap-1.5 grayscale opacity-80">
                                        <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Always Active</span>
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-white/10 rounded-full text-white"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Messages Area */}
                        <ScrollArea ref={scrollAreaRef} className="flex-1 p-6">
                            <div className="space-y-6">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={cn(
                                            "flex flex-col max-w-[85%]",
                                            msg.role === 'user' ? "ml-auto items-end" : "items-start"
                                        )}
                                    >
                                        {msg.type === 'image' && msg.image && (
                                            <div className="mb-2 rounded-2xl overflow-hidden border-2 border-zinc-100">
                                                <img src={msg.image} alt="Uploaded waste" className="w-48 h-48 object-cover" />
                                            </div>
                                        )}

                                        <div className={cn(
                                            "p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm",
                                            msg.role === 'user'
                                                ? "bg-green-600 text-white rounded-tr-none"
                                                : "bg-[#F8FAFC] text-[#1E293B] border border-[#F1F5F9] rounded-tl-none"
                                        )}>
                                            {msg.content}
                                        </div>

                                        {msg.type === 'result' && msg.result && (
                                            <div className="mt-4 w-full space-y-4">
                                                <Card className="border-none bg-[#F1F5F9] shadow-none rounded-2xl">
                                                    <CardContent className="p-4 space-y-3">
                                                        <div className="flex items-center justify-between">
                                                            <Badge className={cn(
                                                                "border-none px-2 py-0.5 font-black text-[9px] uppercase tracking-widest",
                                                                msg.result.decision === 'RECYCLABLE' ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                                                            )}>
                                                                {msg.result.decision.replace('_', ' ')}
                                                            </Badge>
                                                            <span className="text-[10px] font-bold text-zinc-400">Match: {(msg.result.material.confidence * 100).toFixed(0)}%</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            {msg.result.decision === 'RECYCLABLE' ? <Recycle className="h-4 w-4 text-green-600" /> : <Trash2 className="h-4 w-4 text-orange-600" />}
                                                            <span className="font-black text-[#1E293B]">{msg.result.material.display_name}</span>
                                                        </div>
                                                    </CardContent>
                                                </Card>

                                                {msg.result.nearby_options.length > 0 && (
                                                    <div className="space-y-2">
                                                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest pl-1">Nearby Disposal Points</p>
                                                        {msg.result.nearby_options.map((opt: any) => (
                                                            <div key={opt.id} className="bg-white border border-[#F1F5F9] rounded-xl p-3 flex items-center justify-between group hover:border-green-200 transition-colors cursor-pointer">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                                                                        <MapPin className="h-3 w-3" />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs font-black text-[#1E293B]">{opt.display_name}</p>
                                                                        <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-tight">{opt.type}</p>
                                                                    </div>
                                                                </div>
                                                                <ChevronRight className="h-4 w-4 text-zinc-300 group-hover:text-green-600 transition-colors" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {isTyping && (
                                    <div className="flex items-start gap-3">
                                        <div className="bg-[#F8FAFC] p-3 rounded-2xl rounded-tl-none border border-[#F1F5F9] flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin text-green-600" />
                                            <span className="text-xs font-bold text-zinc-400">YUKTI is thinking...</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>

                        {/* Input Area */}
                        <div className="p-6 pt-0">
                            <div className="flex items-center gap-2 p-2 bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-zinc-400 hover:text-green-600 hover:bg-green-50 rounded-xl"
                                >
                                    <Camera className="h-5 w-5" />
                                </Button>
                                <input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendText()}
                                    placeholder="Ask something or upload photo..."
                                    className="flex-1 bg-transparent border-none text-sm font-medium focus:ring-0 placeholder:text-zinc-300"
                                />
                                <Button
                                    size="icon"
                                    onClick={handleSendText}
                                    className="bg-green-600 hover:bg-green-700 text-white rounded-xl h-10 w-10"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Bubble */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-16 h-16 rounded-full shadow-[0_15px_40px_rgba(34,197,94,0.3)] flex items-center justify-center transition-colors duration-300",
                    isOpen ? "bg-white text-green-600 border-2 border-green-50" : "bg-green-600 text-white"
                )}
            >
                {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
            </motion.button>
        </div>
    );
}
