import { useState, useEffect, useRef, useCallback } from 'react'
//  from https://gist.github.com/rista404/77c78ff49914b16e2c5d5de3080bc341
// EXAMPLE USAGE 
// function Component() {
// 	const [items, setItems] = useState([])

//   	async function fetchItems(abortSignal: AbortSignal) {
// 		try {
// 			const res = await fetch(`/api/items/`, { signal: abortSignal })
// 			const resp = await res.json()
// 			if (res.ok && resp.ok) {
// 				setItems(resp.items)
// 			} else {
// 				console.log(res)
// 				alert('Could not fetch items.')
// 			}
// 		} catch (err) {
// 			if (!abortSignal.aborted) {
// 				console.error(err)
// 			}
// 		}
// 	}

// 	const lastUpdated = usePolling(fetchItems)

// 	return <h1>Last updated {lastUpdated}.</h1>

// }

const DEFAULT_POLLING_INTERVAL = 5000

const timefmt = new Intl.DateTimeFormat('en-US', {
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
})

export function useInterval(callback: () => any, delay: number) {
	const savedCallback = useRef<() => any | undefined>()

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	// Set up the interval.
	useEffect(() => {
		const tick = () => {
			if (savedCallback.current) {
				savedCallback.current()
			}
		}
		if (delay !== null) {
			const id = setInterval(tick, delay)
			return () => clearInterval(id)
		}
	}, [delay])
}

// Note: doesn't get updated when the callback function changes
export function usePolling(
	callback: (abortSignal: AbortSignal) => any,
	interval = DEFAULT_POLLING_INTERVAL,
) {
	const abortControllerRef = useRef(new AbortController())
	const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

	useEffect(() => {
		callback(abortControllerRef.current.signal)
		setLastUpdated(new Date())

		return () => {
			abortControllerRef.current.abort()
		}
	}, [])

	const intervalFn = useCallback(() => {
		if (document.hasFocus()) {
			callback(abortControllerRef.current.signal)
			setLastUpdated(new Date())
		}
	}, [])

	useInterval(intervalFn, interval)

	return lastUpdated ? timefmt.format(lastUpdated) : ''
}
