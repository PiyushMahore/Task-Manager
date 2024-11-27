const asyncHandler = (fun) => {
    return (req, res, next) => {
        Promise.resolve(fun(req, res))
            .catch((error) => next(error))
    }
}

export { asyncHandler }
