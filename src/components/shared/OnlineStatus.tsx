const OnlineStatus = () => {
    return (
        <>
            <div className="absolute top-3 right-8 sm:top-4 sm:right-12 flex items-center gap-1 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 font-mono text-[10px] sm:text-xs">ONLINE</span>
            </div>
        </>
    )
}

export default OnlineStatus;
