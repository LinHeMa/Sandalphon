import React from 'react'

type ContentProps = {
  content: string
  highlightedTargets?: string[]
}

export default function ContentBlock({
  content = '',
  highlightedTargets = [
    '因颱風因素及安全考量，如台北市政府有公告停班停課，則延期辦理，辦理日期另行通知；若當天正常上班上課，論壇如期舉行，再請留意市府公告。若造成不便，敬請見諒。',
    '因康芮颱風來襲，台北市政府於30日晚間宣布停班停課，以安全考量論壇必須延期舉辦，辦理日期另行通知，若造成不便，敬請見諒。',
    '受康芮颱風影響，本論壇已延期至11月14日下午13:20-17:20，改於台大醫院國際會議中心201會議室舉行。',
  ],
}: ContentProps): JSX.Element | null {
  if (typeof content !== 'string' || !content.trim()) {
    return null
  }

  // 將每個關鍵字包裝成 `<span>` 標籤的 React 元素
  const getHighlightedContent = (text: string) => {
    if (!highlightedTargets || highlightedTargets.length === 0) return text

    // 創建一個正則來動態匹配目標關鍵字，並避免大小寫敏感
    const regex = new RegExp(`(${highlightedTargets.join('|')})`, 'gi')

    return text.split(regex).map((part, index) => {
      // 如果匹配到的片段屬於目標關鍵字，將其包裝成 `<span>`
      if (
        highlightedTargets.some(
          (target) => target.toLowerCase() === part.toLowerCase()
        )
      ) {
        return (
          <span key={index} style={{ fontWeight: 800, color: '#ff0004' }}>
            {part}
          </span>
        )
      }
      return part
    })
  }

  // 將 `content` 的每個段落渲染為分段 `<p>` 標籤
  return (
    <div className="shared-content-block">
      {content.split('\n').map((paragraph, index) => (
        <p key={index}>{getHighlightedContent(paragraph)}</p>
      ))}
    </div>
  )
}
