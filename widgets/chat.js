(function(projectId) {
  const generateRandomHash = () => {
    const hash1 = Math.random().toString(36).substr(2, 8);
    const hash2 = Math.random().toString(36).substr(2, 8);
    const hash3 = Math.random().toString(36).substr(2, 8);
    const hash4 = Math.random().toString(36).substr(2, 8);

    return `${hash1}-${hash2}-${hash3}-${hash4}`;
  };

  const hasStorageClientChatData = () => {
    return !!JSON.parse(localStorage.getItem('clientData'));
  };

  const generateChatWidget = () => {
    const chat = document.createElement('iframe');
    const trigger = document.createElement('iframe');

    let chatAttributes;
    let triggerAttributes;

    const chatWindowStyles = `
      border: none;
      box-shadow: 0 5px 35px rgb(0 0 0 / 15%);
      border-radius: 15px;
      position: fixed;
      bottom: 100px;
      transition: .2s all;
      transform: translateY(-100px);
      opacity: 0;
      visibility: hidden;
    `;
    const chatTriggerStyles = `
      border: none;
      box-shadow: rgb(0 0 0 / 20%) 0px 5px 10px;
      border-radius: 50%;
      position: fixed;
      bottom: 30px;
      display: none;
    `;

    const getChatWindowAttributes = (projectId, clientId) => {
      return {
        'src': `${host}/project/${projectId}/iframe/${clientId}`,
        'name': 'blyak_chat',
        'id': 'chatWindow',
        'width': '350',
        'height': '500',
        'style': `${chatWindowStyles}`,
      };
    };

    const getChatTriggerAttributes = (projectId, clientId) => {
      return {
        'src': `${host}/project/${projectId}/iframe/${clientId}/chatTrigger`,
        'name': 'chat_trigger',
        'id': 'chatTrigger',
        'width': '50',
        'height': '50',
        'style': `${chatTriggerStyles}`,
      };
    };

    if (hasStorageClientChatData()) {
      const { clientId, projectId } = JSON.parse(localStorage.getItem('clientData'));

      const storageClientId = clientId;
      chatAttributes = getChatWindowAttributes(projectId, storageClientId);
      triggerAttributes = getChatTriggerAttributes(projectId, storageClientId);
    } else {
      const clientId = generateRandomHash();

      chatAttributes = getChatWindowAttributes(projectId, clientId);
      triggerAttributes = getChatTriggerAttributes(projectId, clientId);
      localStorage.setItem('clientData', JSON.stringify({ clientId, projectId }));
    }

    for (let key in chatAttributes) {
      chat.setAttribute(key, chatAttributes[key]);
    }

    for (let key in triggerAttributes) {
      trigger.setAttribute(key, triggerAttributes[key]);
    }

    return {
      chat,
      trigger,
    };
  };

  const widget = generateChatWidget().chat;
  const widgetTrigger = generateChatWidget().trigger;

  const chatWindowIframe = document.body.appendChild(widget);

  document.body.appendChild(widgetTrigger);

  const clearAndSetRulesSteps = (chatSettings) => {
    let rulesSteps;
    if (localStorage.getItem('rulesSteps')) {
      localStorage.removeItem('rulesSteps')
    }
    rulesSteps = chatSettings.rules.map((rule) => ({
      ruleId: rule.id,
      status: rule.isActivate ? 'inProgress' : 'disactivated'
    }));
    localStorage.setItem('rulesSteps', JSON.stringify(rulesSteps));
  };

  const handlePostMessage = (message) => {
    switch (message.event) {
      case 'updateChatWindowIsOpen':
        if (message.chatWindowIsOpen) {
          chatWindowIframe.style.visibility = 'visible';
          chatWindowIframe.style.transform = 'translateY(0)';
          chatWindowIframe.style.opacity= '1';
          chatWindowIframe.className += 'active';
        } else {
          chatWindowIframe.style.visibility = 'hidden';
          chatWindowIframe.style.transform = 'translateY(-100px)';
          chatWindowIframe.style.opacity= '0';
          chatWindowIframe.className = '';
        }
        chatWindowIframe.contentWindow.postMessage({
          event: 'updateData',
          data: message
        }, `${host}`);//'http://localhost:3000'
        break;
      case 'updateChatSettings':
        let chatSettings;
        chatSettings = chatSettings ? chatSettings : 'chatSettings' in message ? message.chatSettings : null;

        if (chatSettings) {
          const localStorageClientChatSettings = localStorage.getItem('chatSettings');
    
          if (!localStorageClientChatSettings) {
            localStorage.setItem('chatSettings', JSON.stringify(message.chatSettings));
            clearAndSetRulesSteps(chatSettings);
          }
          
          chatWindowIframe.style[chatSettings.buttonLocation] = `30px`;
          widgetTrigger.style.transform = `scale(${chatSettings.buttonScale})`;
    
          if (chatSettings.buttonText) {
            widgetTrigger.style.borderRadius = `25px`;
            widgetTrigger.style.width = `${chatSettings.buttonWidth + 30.5}px`;
          }
    
          widgetTrigger.style[chatSettings.buttonLocation] = `30px`;
          widgetTrigger.style.display = `block`;
        }
        break;
      case 'updateRulesSteps':
        const rulesSteps = JSON.parse(localStorage.getItem('rulesSteps'));
        const foundRuleStep = rulesSteps.find((ruleStep) => ruleStep.ruleId === message.ruleId);
        const foundRuleStepIndex = rulesSteps.findIndex((ruleStep) => ruleStep.ruleId === message.ruleId);
        console.log(message, 'MESSAGE');
        foundRuleStep.status = message.status;
        rulesSteps.splice(foundRuleStepIndex, 1, foundRuleStep);
        localStorage.setItem('rulesSteps', JSON.stringify(rulesSteps));
        break;
      case 'getDataFromClientWebsite':
        console.log('eeeeeeeeee');
        chatWindowIframe.contentWindow.postMessage({
          event: 'acceptDataFromClientWebsite',
          localStorageClientChatSettings: localStorage.getItem('chatSettings'),
          origin: window.location.href,
          localStorageRulesSteps: localStorage.getItem('rulesSteps')
        }, `${host}`); //'http://localhost:3000'
        break;
      case 'closeChatWindowIframe':
        const chatWindowIframeNode = document.getElementById('chatWindow');
        const chatTriggerIframeNode = document.getElementById('chatTrigger');

        chatWindowIframeNode.remove();
        chatTriggerIframeNode.remove();
    }
  };

  window.addEventListener('message', function(e) {
    console.log(e.data, 'PPPPPPPPPPP');
    handlePostMessage(e.data);
  });
}(project_id));