const CardCorners = ({ isBento }: { isBento: boolean }) => {
    return isBento === false ? (
        <>
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-cyan-400/50" />
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-cyan-400/50" />
            <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-cyan-400/50" />
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-cyan-400/50" />
        </>
    ) : (
        <>
            <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 w-1 h-1 sm:w-1.5 sm:h-1.5 border-t border-l border-cyan-400/50" />
            <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1 h-1 sm:w-1.5 sm:h-1.5 border-t border-r border-cyan-400/50" />
            <div className="absolute bottom-0.5 left-0.5 sm:bottom-1 sm:left-1 w-1 h-1 sm:w-1.5 sm:h-1.5 border-b border-l border-cyan-400/50" />
            <div className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 w-1 h-1 sm:w-1.5 sm:h-1.5 border-b border-r border-cyan-400/50" />
        </>
    )
}

export default CardCorners;
