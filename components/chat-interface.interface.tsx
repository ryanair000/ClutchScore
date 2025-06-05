        <TabsContent value="chat" className="relative flex-1 flex flex-col h-full m-0">
          <div className="flex-1 overflow-y-auto p-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={message.user.image} alt={message.user.name} />
                      <AvatarFallback>{message.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium leading-none">{message.user.name}</p>
                      <p className="text-sm text-muted-foreground">{message.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="p-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Ask about game walkthroughs, trophies, or tips..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === '' || isLoading}
                className={cn(
                  "bg-[#0070CC] hover:bg-[#005da9] text-white",
                  (inputValue.trim() === '' || isLoading) && "opacity-50 cursor-not-allowed"
                )}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendIcon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="trophies" className="h-full flex-1 flex items-center justify-center">
          {/* ... existing code ... */}
        </TabsContent> 