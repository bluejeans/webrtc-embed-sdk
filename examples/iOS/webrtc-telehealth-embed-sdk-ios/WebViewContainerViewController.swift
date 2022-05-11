//
//  WebViewContainerViewController.swift
//  webrtc-telehealth-embed-sdk-ios
//
//  Created by Ruairi Griffin on 24/02/22.
//

import UIKit
import WebKit
import AVFoundation

class WebViewContainerViewController: UIViewController, WKUIDelegate, WKNavigationDelegate {
    
    @IBOutlet weak var webViewContainerView: UIView!
    @IBOutlet weak var controlsContainerView: UIView!
    
    @IBOutlet weak var receivedMessageTextView: UITextView!
    @IBOutlet weak var connectionStateLabel: UILabel!
    @IBOutlet weak var customMessageTextView: UITextView!
    
    var joinJSON = ""
    
    var contentController: WKUserContentController?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setupWebView()
        
        setupUI()
        
        loadWebView()
    }
    
    private lazy var webView: WKWebView = {
        let webConfiguration = WKWebViewConfiguration()
        
        // Prevents self/remote video playing full screen
        webConfiguration.allowsInlineMediaPlayback = true
        
        
        let webView = WKWebView(frame: .zero, configuration: webConfiguration)
        webView.scrollView.isScrollEnabled = false
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.translatesAutoresizingMaskIntoConstraints = false
        
        // Needed to avoid issue where BlueJeans shows the mobile landing page (not WebRTC page)
        webView.customUserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1"
        webView.uiDelegate = self
        webView.navigationDelegate = self
        return webView
    }()
    
    
    func setupWebView() {
        webViewContainerView.addSubview(webView)
        NSLayoutConstraint.activate([
            webView.leadingAnchor.constraint(equalTo: webViewContainerView.leadingAnchor),
            webView.trailingAnchor.constraint(equalTo: webViewContainerView.trailingAnchor),
            webView.bottomAnchor.constraint(equalTo: webViewContainerView.layoutMarginsGuide.bottomAnchor),
            webView.topAnchor.constraint(equalTo: webViewContainerView.layoutMarginsGuide.topAnchor)
        ])
        
        contentController = self.webView.configuration.userContentController
        
        // Adds handler for 'sendMessageHandler' post messages for web view, see WKScriptMessageHandler
        contentController?.add(self, name: "sendMessageHandler")
    }
    
    func loadWebView() {
        if let url = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "WebView") {
            webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        }
    }
    
    func postJoinMessage() {
        let message = """
        window.postMessage(\(joinJSON), "*")
        """
        
        runJavascript(message)
    }
    
    func setupUI() {
        let defaultCustomMessageText = """
        { "type": "embedProxy.toProxy", method: "leave", "args": [] }
        """
        customMessageTextView.text = defaultCustomMessageText
    }
    
    
    func backToJoin() {
        performSegue(withIdentifier: "UnwindToJoin", sender: self)
    }
    
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        
        // Needed to allow the WKWebView to be deallocated
        contentController?.removeScriptMessageHandler(forName: "sendMessageHandler")
    }
    
    @IBAction func sendCustomMessage() {
        let message = customMessageTextView.text ?? ""
        let postMessage = """
        window.postMessage(\(message), "*")
        """
        runJavascript(postMessage)
    }
    
    func receiveMessageFromWebView(message: WKScriptMessage) {
        receivedMessageTextView.text = "\(message.body)"
        
        guard let body = message.body as? String,
              let data = body.data(using: .utf8, allowLossyConversion: true) else {
                  NSLog("Failed to parse message as data")
                  return
        }

        guard let connectionStateMessage = try? JSONDecoder().decode(ConnectionStateMessage.self, from: data) else {
            NSLog("Failed to decode data as a ConnectionStateMessage struct")
            return
        }
        
        if connectionStateMessage.value == .disconnected {
            backToJoin()
        }
        connectionStateLabel.text = connectionStateMessage.value.rawValue
    }
    
    // MARK: Helper
    private func runJavascript(_ script: String) {
        webView.evaluateJavaScript(script, in: nil, in: WKContentWorld.page, completionHandler: { [ weak self ] res in
            switch res {
            case .success(let result):
                print("[RUNJS] Success (result): \(result)")
            case .failure(let error):
                print("[RUNJS] Error occurred: \(error)")
                self?.presentErrorAlert(error: "\(error)")
            }
        })
    }
    
    func presentErrorAlert(error: String) {
        let alert = UIAlertController(title: "JS Error", message: error, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: NSLocalizedString("OK", comment: "Default action"), style: .default, handler: nil))
        present(alert, animated: true, completion: nil)
    }
}

// MARK: WKScriptMessageHandler
extension WebViewContainerViewController: WKScriptMessageHandler {
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        receiveMessageFromWebView(message: message)
    }
}

// MARK: WKNavigationDelegate
extension WebViewContainerViewController {
    func webView(_ webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation!) {
        NSLog(#function)
    }
    
    func webView(_ webView: WKWebView, didCommit navigation: WKNavigation!) {
        NSLog(#function)
    }
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        NSLog(#function)
        
        // MARK: - Send Join Message
        postJoinMessage()
    }
    
    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        NSLog(#function)
        NSLog(error.localizedDescription)
    }
    
    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        NSLog(#function)
        NSLog(error.localizedDescription)
    }
}

// Stops mic/camera permissions being requested for every meeting join (available on iOS 15 and up only)
extension WebViewContainerViewController {
    @available(iOS 15, *)
    func webView(_ webView: WKWebView, decideMediaCapturePermissionsFor origin: WKSecurityOrigin, initiatedBy frame: WKFrameInfo, type: WKMediaCaptureType) async -> WKPermissionDecision {
        return .grant
    }
}

// MARK: - Connection State Message
struct ConnectionStateMessage: Codable {
    var type = "embedProxy.toNative"
    var property = "connectionState"
    
    enum ConnectionState: String, Codable {
        case connecting = "Connecting"
        case connected = "Connected"
        case disconnected = "Disconnected"
        case reconnecting = "Reconnecting"
    }
    
    let value: ConnectionState
}
